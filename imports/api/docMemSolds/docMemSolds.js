import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Factory } from 'meteor/dburles:factory';

const DocMemSolds = new Mongo.Collection('DocMemSolds');
export default DocMemSolds;

DocMemSolds.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

DocMemSolds.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

DocMemSolds.schema = new SimpleSchema({
  docId: {
    type: String,
    label: 'The docId of the docMemSold.',
  },
  memberId: {
    type: String,
    label: 'The memberId of the docMemSold.',
  },
  sum: {
    type: Number,
    label: 'The sum of the docMemSold.',
  }
});

DocMemSolds.attachSchema(DocMemSolds.schema);

Factory.define('docMemSold', DocMemSolds, {
  docId: () => 'Factory Document ID',
  memberId: () => 'Factory Member ID',
  sum: () => 'Factory Sum',
});
