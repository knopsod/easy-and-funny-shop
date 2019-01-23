import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Members from '../members';
import Documents from '../../documents/documents';

Meteor.publish('members.list', (userId) => {
  check(userId, String);
  return Members.find({ userId });
});

Meteor.publish('members.document.list', (docId) => {
  check(docId, String);
  const doc = Documents.findOne(docId);
  return Members.find({ userId: doc.userId });
});

Meteor.publish('members.view', (_id) => {
  check(_id, String);
  return Members.find(_id);
});
