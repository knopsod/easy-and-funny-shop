import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button, ListGroup, ListGroupItem, Alert, Grid, Row, Col, FormGroup, FormControl, Table } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'
import { Bert } from 'meteor/themeteorchef:bert';
import moment from 'moment';
import DatePicker from 'react-bootstrap-date-picker';
import Documents from '../../api/documents/documents';
import Members from '../../api/members/members';
import Solds from '../../api/solds/solds';
import { removeDocument } from '../../api/documents/methods';
import { upsertSold, removeSold } from '../../api/solds/methods';
import NotFound from './NotFound';
import container from '../../modules/container';
import MemberSoldItem from '../components/MemberSoldItem';
import MemberSoldReadOnlyItem from '../components/MemberSoldReadOnlyItem';

const handleEdit = (_id) => {
  browserHistory.push(`/documents/${_id}/edit`);
};

const handleRemove = (_id) => {
  if (confirm('Are you sure? This is permanent!')) {
    removeDocument.call({ _id }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Document deleted!', 'success');
        browserHistory.push('/documents');
      }
    });
  }
};

const saveSoldDateSession = (date) => {
  Session.set('soldDate', date);
}

const ViewDocument = ({ doc, members, soldDate, sum }) => {
  return doc ? (
    <div className="ViewDocument">
      <div className="page-header clearfix">
        <h4 className="pull-left">{ doc && `ปี ${doc.year} : ${doc.title}` }</h4>
        <ButtonToolbar className="pull-right">
          <ButtonGroup bsSize="small">
            { doc.userId === Meteor.userId() ? <Button 
              onClick={ () => handleEdit(doc._id) }>แก้ไข</Button> :
              undefined
            }
            { false ? <Button 
              onClick={ () => handleRemove(doc._id) } className="text-danger">ลบ</Button> :
              undefined
            }
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      { doc && doc.body }
      <br />
      <br />
      <FormGroup>
        <DatePicker name="date" dateFormat="YYYY-MM-DD"
          onChange={date => saveSoldDateSession(date.substring(0, 10))} value={soldDate}/>
      </FormGroup>
      {
        members.length > 0 ? <Table>
          <tbody>
          {members.map(({ _id, title, body, solds }) => {
            return doc.userId === Meteor.userId() ?
              <MemberSoldItem key={_id} title={title} body={body} 
                solds={solds} memberId={_id} docId={doc._id} soldDate={soldDate} /> :
              <MemberSoldReadOnlyItem key={_id} title={title} body={body} 
                solds={solds} memberId={_id} docId={doc._id} soldDate={soldDate} />
          })}
            { doc.userId === Meteor.userId() ?
              <tr>
                <td colSpan={2} />
                <td style={{ verticalAlign: 'middle' }}><h2>รวม</h2></td>
                <td colSpan={2} style={{ verticalAlign: 'middle' }}><h2>{ sum } .-</h2></td>
              </tr> :
              <tr>
                <td style={{ verticalAlign: 'middle', width: 80 }}><h2>รวม</h2></td>
                <td style={{ verticalAlign: 'middle' }}><h2>{ sum } .-</h2></td>
              </tr>
            }
          </tbody>
        </Table> :
        <Alert bsStyle="warning">No members yet.</Alert>
      }
    </div>
  ) : <NotFound />;
};

ViewDocument.propTypes = {
  doc: PropTypes.object,
  members: PropTypes.array,
  soldDate: PropTypes.string,
  sum: PropTypes.number,
};

export default container((props, onData) => {
  const documentId = props.params._id;
  const subscription = Meteor.subscribe('documents.view', documentId);
  const membersSubscription = Meteor.subscribe('members.list');
  const soldsSubscription = Meteor.subscribe('solds.list');

  Session.setDefault('soldDate', moment().toISOString(true).substring(0, 10));

  const soldDate = Session.get('soldDate');
  let sum = 0;
  
  if (subscription.ready() && membersSubscription.ready() && soldsSubscription.ready()) {
    const doc = Documents.findOne(documentId);
    const members = Members.find({ userId: doc.userId }, { sort: { title: 1 } }).fetch();
    const solds = Solds.find({ docId: doc._id, soldDate: soldDate }, { sort: { createdAt: 1 } }).fetch();

    members.forEach(function(member){
      member.solds = solds.filter(sold => sold.memberId === member._id);
    });

    solds.forEach(function(sold) {
      sum += sold.cancelled ? 0 : sold.amount;
    });
    
    onData(null, { doc, members, soldDate, sum });
  }
}, ViewDocument);
