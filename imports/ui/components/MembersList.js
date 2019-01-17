import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import Members from '../../api/members/members';
import container from '../../modules/container';

const handleNav = _id => browserHistory.push(`/members/${_id}`);

const MembersList = ({ members }) => (
  members.length > 0 ? <ListGroup className="MembersList">
    {members.map(({ _id, title, body }) => (
      <ListGroupItem key={ _id } onClick={ () => handleNav(_id) }>
        { `${title}. ${body}` }
      </ListGroupItem>
    ))}
  </ListGroup> :
  <Alert bsStyle="warning">No members yet.</Alert>
);

MembersList.propTypes = {
  members: PropTypes.array,
};

export default container((props, onData) => {
  const subscription = Meteor.subscribe('members.list');
  if (subscription.ready()) {
    const members = Members.find({ userId: Meteor.userId() }, { sort: { title: 1 } }).fetch();
    onData(null, { members });
  }
}, MembersList);