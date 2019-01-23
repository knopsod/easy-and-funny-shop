import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { ListGroup, ListGroupItem, Alert, Table } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import Members from '../../api/members/members';
import container from '../../modules/container';
import MemberInlineEditor from '../components/MemberInlineEditor';

const handleNav = _id => browserHistory.push(`/members/${_id}`);

const MembersList = ({ members }) => (
  members.length > 0 ? <Table>
    <tbody>
      { members.map(({_id, title, body, userId, shown}) => 
        (<MemberInlineEditor key={_id} _id={_id} title={title} body={body} userId={userId} shown={shown} />)
      ) }
    </tbody>
  </Table> :
  <Alert bsStyle="warning">No members yet.</Alert>
);

MembersList.propTypes = {
  members: PropTypes.array,
};

export default container((props, onData) => {
  const subscription = Meteor.subscribe('members.list', Meteor.userId());
  if (subscription.ready()) {
    const members = Members.find({ userId: Meteor.userId() }, { sort: { shown: -1, title: 1 } }).fetch();
    onData(null, { members });
  }
}, MembersList);