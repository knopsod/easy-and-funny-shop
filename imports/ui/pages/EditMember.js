import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Members from '../../api/members/members';
import DocumentEditor from '../components/MemberEditor';
import NotFound from './NotFound';
import container from '../../modules/container';

const EditMember = ({ doc }) => (doc ? (
  <div className="EditMember">
    <h4 className="page-header">แก้ไข "{ doc.title }"</h4>
    <DocumentEditor doc={ doc }/>
  </div>
) : <NotFound />);

EditMember.propTypes = {
  doc: PropTypes.object,
};

export default container((props, onData) => {
  const memberId = props.params._id;
  const subscription = Meteor.subscribe('members.view', memberId);

  if (subscription.ready()) {
    const doc = Members.findOne(memberId);
    onData(null, { doc });
  }
}, EditMember);
