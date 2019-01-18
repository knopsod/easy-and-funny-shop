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
  docId: {
    type: String,
    label: 'The doc ID the sold.',
  },
  memberId: {
    type: String,
    label: 'The doc ID the sold.',
  },
  createdAt: {
    type: String,
    label: 'The created at the sold.',
  },
  createdDate: {
    type: String,
    label: 'The created date the sold.',
  },
  amount: {
    type: Number,
    label: 'The amount the sold.',
  },
  cancelled: {
    type: Boolean,
    label: 'The cancelled the sold.',
  },
});

Solds.attachSchema(Solds.schema);

Factory.define('sold', Solds, {
  docId: () => 'Factory Doc ID',
  memberId: () => 'Factory Member ID',
  createdAt: () => 'Factory Created At',
  createdDate: () => 'Factory Created Date',
  amount: () => 'Factory Amount',
  cancelled: () => 'Factory Cancelled',
});
