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

const ViewDocumentSumAll = ({ doc, members, sumAll }) => {
  return doc ? (
    <div className="ViewDocumentSumAll">
      <div className="page-header clearfix">
        <h4 className="pull-left">{ doc && `ปี ${doc.year} : ${doc.title}` }</h4>
        <ButtonToolbar className="pull-right">
          <ButtonGroup bsSize="small">
            { doc.userId === Meteor.userId() ? <Button 
              onClick={ () => handleEdit(doc._id) }>แก้ไข</Button> :
              undefined
            }
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      <p>{ doc && doc.body }</p>
      <p>สถานะ : { doc && doc.shown ? 'แสดง' : 'ซ่อน' }</p>
      <small>{ doc && `สร้างโดย : ${doc.user.profile.name.first} ${doc.user.profile.name.last}, เมื่อ : ${doc.createdDate}` }</small>
      <br />
      <br />
      
      {
        members.length > 0 ? <Table>
          <tbody>
          {members.map(({ _id, title, body }) => {
            return <tr key={_id}>
              <td><h4>{`${title}. ${body}`}</h4></td>
              <td><h4>0</h4></td>
            </tr>
          })}
          </tbody>
          <tfoot>
            <tr>
              <td style={{ verticalAlign: 'middle' }}><h2>รวม</h2></td>
              <td colSpan={2} style={{ verticalAlign: 'middle' }}><h2>{ sumAll } .-</h2></td>
            </tr>
          </tfoot>
        </Table> :
        <Alert bsStyle="warning">No members yet.</Alert>
      }
    </div>
  ) : <NotFound />;
};

ViewDocumentSumAll.propTypes = {
  doc: PropTypes.object,
  members: PropTypes.array,
  sumAll: PropTypes.number,
};

export default container((props, onData) => {
  const docId = props.params._id;

  const subscription = Meteor.subscribe('documents.view', docId);
  const membersSubscription = Meteor.subscribe('members.document.list', docId);
  
  let sumAll = 0;
  
  if (subscription.ready() && membersSubscription.ready()) {
    const doc = Documents.findOne(docId);
    const members = Members.find({ userId: doc.userId, shown: true }, { sort: { title: 1 } }).fetch();
    
    members.forEach(function(member) {
      member.solds = [];
    });

    onData(null, { doc, members, sumAll });
  }
}, ViewDocumentSumAll);
