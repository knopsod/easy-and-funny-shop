import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import DocMemSolds from '../docMemSolds';

Meteor.publish('docMemSolds.list', () => DocMemSolds.find());

Meteor.publish('docMemSolds.view', (_id) => {
  check(_id, String);
  return DocMemSolds.find(_id);
});

Meteor.publish('docMemSolds.doc', (docId) => {
  check(docId, String);
  return DocMemSolds.find({ docId });
});
