import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Factory } from 'meteor/dburles:factory';

const Solds = new Mongo.Collection('Solds');
export default Solds;

Solds.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Solds.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Solds.schema = new SimpleSchema({
  title: {
    type: Number,
    label: 'The title of the sold.',
  },
  body: {
    type: String,
    label: 'The body of the sold.',
  },
  docId: {
    type: String,
    label: 'The doc ID of the sold.',
  },
  memberId: {
    type: String,
    label: 'The member ID of the sold.',
  },
  createdAt: {
    type: String,
    label: 'The created at of the sold.',
  },
  createdDate: {
    type: String,
    label: 'The created date of the sold.',
  },
  amount: {
    type: Number,
    label: 'The amount of the sold.',
  },
  cancelled: {
    type: Boolean,
    label: 'The cancelled of the sold.',
  },
});

Solds.attachSchema(Solds.schema);

Factory.define('sold', Solds, {
  title: () => 'Factory Title',
  body: () => 'Factory Body',
  userId: () => 'Factory User ID',
});
