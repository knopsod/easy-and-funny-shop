/* eslint-disable no-undef */

import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertMember } from '../api/members/methods.js';
import './validation.js';

let component;

const handleUpsert = () => {
  const { doc } = component.props;
  const confirmation = doc && doc._id ? 'Member updated!' : 'Member added!';
  const upsert = {
    title: parseInt(document.querySelector('[name="title"]').value.trim(), 10),
    body: document.querySelector('[name="body"]').value.trim(),
    userId: Meteor.userId(),
    shown: document.querySelector('[name="shown"]').checked,
  };

  if (doc && doc._id){
    upsert._id = doc._id;
  }

  upsertMember.call(upsert, (error, response) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      component.documentEditorForm.reset();
      Bert.alert(confirmation, 'success');
      browserHistory.push(`/members/${response.insertedId || doc._id}`);
    }
  });
};

const validate = () => {
  $(component.documentEditorForm).validate({
    rules: {
      title: {
        required: true,
      },
      body: {
        required: true,
      },
    },
    messages: {
      title: {
        required: 'Need a title in here, Seuss.',
      },
      body: {
        required: 'This thneeds a body, please.',
      },
    },
    submitHandler() { handleUpsert(); },
  });
};

export default function documentEditor(options) {
  component = options.component;
  validate();
}
