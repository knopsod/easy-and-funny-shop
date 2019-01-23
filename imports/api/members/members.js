import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Factory } from 'meteor/dburles:factory';

const Members = new Mongo.Collection('Members');
export default Members;

Members.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Members.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Members.schema = new SimpleSchema({
  title: {
    type: Number,
    label: 'The title of the member.',
  },
  body: {
    type: String,
    label: 'The body of the member.',
  },
  userId: {
    type: String,
    label: 'The userId of the member.',
  },
  shown: {
    type: Boolean,
    label: 'The shown of the member.',
  }
});

Members.attachSchema(Members.schema);

Factory.define('member', Members, {
  title: () => 'Factory Title',
  body: () => 'Factory Body',
  userId: () => 'Factory User ID',
  shown: () => 'Factory Shown',
});
