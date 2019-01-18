import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button, ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import moment from 'moment';
import Documents from '../../api/documents/documents';
import Members from '../../api/members/members';
import Solds from '../../api/solds/solds';
import { removeDocument } from '../../api/documents/methods';
import { upsertSold } from '../../api/solds/methods';
import NotFound from './NotFound';
import container from '../../modules/container';

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

const ViewDocument = ({ doc, members }) => {
  return doc ? (
    <div className="ViewDocument">
      <div className="page-header clearfix">
        <h4 className="pull-left">{ doc && `ปี ${doc.year} : ${doc.title}` }</h4>
        <ButtonToolbar className="pull-right">
          <ButtonGroup bsSize="small">
            { doc.userId === Meteor.userId() ? <Button onClick={ () => handleEdit(doc._id) }>แก้ไข</Button> : undefined }
            { false ? <Button onClick={ () => handleRemove(doc._id) } className="text-danger">ลบ</Button> : undefined }
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      { doc && doc.body }
      <br />
      <br />
      {
        members.length > 0 ? <ListGroup className="SoldsList">
          {members.map(({ _id, title, body }) => (
            <ListGroupItem key={ _id }>
              { `${title} ${body}` }
            </ListGroupItem>
          ))}
        </ListGroup> :
        <Alert bsStyle="warning">No members yet.</Alert>
      }
    </div>
  ) : <NotFound />;
};

ViewDocument.propTypes = {
  doc: PropTypes.object,
  members: PropTypes.array,
};

export default container((props, onData) => {
  const documentId = props.params._id;
  const subscription = Meteor.subscribe('documents.view', documentId);
  const membersSubscription = Meteor.subscribe('members.list');
  const soldsSubscription = Meteor.subscribe('solds.list');

  const now = moment().toISOString(true).substring(0, 10);
  
  if (subscription.ready() && membersSubscription.ready() && soldsSubscription.ready()) {
    const doc = Documents.findOne(documentId);
    const members = Members.find({ userId: doc.userId }, { sort: { title: 1 } }).fetch();
    const solds = Solds.find({ docId: doc._id, createdDate: now }).fetch();
    
    console.log(now);
    console.log(doc);
    members.forEach(function(element){
      element.solds = [];
    });
    console.log(members);
    console.log(solds);
    
    onData(null, { doc, members });
  }
}, ViewDocument);
