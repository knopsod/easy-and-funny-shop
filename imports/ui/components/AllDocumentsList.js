import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import Documents from '../../api/documents/documents';
import container from '../../modules/container';

const handleNav = _id => browserHistory.push(`/documents/${_id}`);

const AllDocumentsList = ({ documents }) => (
  documents.length > 0 ? <ListGroup className="DocumentsList">
    {documents.map(({ _id, title, year, user, createdDate }) => (
      <ListGroupItem key={ _id } onClick={ () => handleNav(_id) }>
        { `ปี : ${year}, ${title}` }<small className="pull-right">{ `สร้างโดย : ${user.profile.name.first} ${user.profile.name.last}, เมื่อ : ${createdDate}` }</small>
      </ListGroupItem>
    ))}
  </ListGroup> :
  <Alert bsStyle="warning">No documents yet.</Alert>
);

AllDocumentsList.propTypes = {
  documents: PropTypes.array,
};

export default container((props, onData) => {
  const subscription = Meteor.subscribe('documents.list');
  if (subscription.ready()) {
    const documents = Documents.find({}, { sort: { year: -1 } }).fetch();
    onData(null, { documents });
  }
}, AllDocumentsList);
