import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Members from '../members';

Meteor.publish('members.list', (userId) => {
  check(userId, String);
  return Members.find({ userId });
});

Meteor.publish('members.view', (_id) => {
  check(_id, String);
  return Members.find(_id);
});
