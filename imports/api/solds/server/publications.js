import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Solds from '../solds';

Meteor.publish('solds.list', (docId, soldDate) => {
  check(docId, String);
  check(soldDate, String);
  return Solds.find({ docId, soldDate });
});

Meteor.publish('solds.view', (_id) => {
  check(_id, String);
  return Solds.find(_id);
});
