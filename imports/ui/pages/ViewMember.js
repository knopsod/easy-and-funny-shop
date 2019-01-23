import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Members from '../../api/members/members';
import { removeMember } from '../../api/members/methods';
import NotFound from './NotFound';
import container from '../../modules/container';

const handleEdit = (_id) => {
  browserHistory.push(`/members/${_id}/edit`);
};

const handleRemove = (_id) => {
  if (confirm('Are you sure? This is permanent!')) {
    removeMember.call({ _id }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Member deleted!', 'success');
        browserHistory.push('/members');
      }
    });
  }
};

const ViewMember = ({ doc }) => {
  return doc ? (
    <div className="ViewMember">
      <div className="page-header clearfix">
        <h4 className="pull-left">{ doc && doc.title }</h4>
        <ButtonToolbar className="pull-right">
          <ButtonGroup bsSize="small">
            { doc.userId === Meteor.userId() ? <Button onClick={ () => handleEdit(doc._id) }>แก้ไข</Button> : undefined }
            { false ? <Button onClick={ () => handleRemove(doc._id) } className="text-danger">ลบ</Button> : undefined }
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      <p>
        { doc && doc.body }
      </p>
      <p>
        สถานะ : { doc && doc.shown ? 'แสดง' : 'ซ่อน' }
      </p>
    </div>
  ) : <NotFound />;
};

ViewMember.propTypes = {
  doc: PropTypes.object,
};

export default container((props, onData) => {
  const memberId = props.params._id;
  const subscription = Meteor.subscribe('members.view', memberId);

  if (subscription.ready()) {
    const doc = Members.findOne(memberId);
    onData(null, { doc });
  }
}, ViewMember);
