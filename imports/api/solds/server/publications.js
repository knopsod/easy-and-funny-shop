import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Solds from '../solds';

Meteor.publish('solds.list', () => Solds.find());

Meteor.publish('solds.view', (_id) => {
  check(_id, String);
  return Solds.find(_id);
});
