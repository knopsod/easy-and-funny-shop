import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Documents from '../../api/documents/documents';
import { removeDocument } from '../../api/documents/methods';
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

const ViewDocument = ({ doc }) => {
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
    </div>
  ) : <NotFound />;
};

ViewDocument.propTypes = {
  doc: PropTypes.object,
};

export default container((props, onData) => {
  const documentId = props.params._id;
  const subscription = Meteor.subscribe('documents.view', documentId);

  if (subscription.ready()) {
    const doc = Documents.findOne(documentId);
    onData(null, { doc });
  }
}, ViewDocument);
