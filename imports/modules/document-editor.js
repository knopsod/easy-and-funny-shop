/* eslint-disable no-undef */

import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import moment from 'moment';

import { upsertDocument } from '../api/documents/methods.js';
import './validation.js';

let component;

const handleUpsert = () => {
  const { doc } = component.props;
  const confirmation = doc && doc._id ? 'Document updated!' : 'Document added!';
  const upsert = {
    title: document.querySelector('[name="title"]').value.trim(),
    year: parseInt(document.querySelector('[name="year"]').value.trim(), 10),
    body: document.querySelector('[name="body"]').value.trim(),
    shown: document.querySelector('[name="shown"]').checked,
  };

  if (doc && doc._id){
    upsert._id = doc._id;
    upsert.userId = doc.userId;
    upsert.user = doc.user;
    upsert.createdDate = doc.createdDate;
  } else {
    upsert.userId = Meteor.userId();
    upsert.user = Meteor.user();
    upsert.createdDate = moment().toISOString(true).substring(0, 10);
  }

  upsertDocument.call(upsert, (error, response) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      component.documentEditorForm.reset();
      Bert.alert(confirmation, 'success');
      browserHistory.push(`/documents/${response.insertedId || doc._id}`);
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
