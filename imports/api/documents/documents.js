import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Factory } from 'meteor/dburles:factory';

const Documents = new Mongo.Collection('Documents');
export default Documents;

Documents.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Documents.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Documents.schema = new SimpleSchema({
  title: {
    type: String,
    label: 'The title of the document.',
  },
  year: {
    type: Number,
    label: 'The year of the document.',
  },
  body: {
    type: String,
    label: 'The body of the document.',
  },
  userId: {
    type: String,
    label: 'The userId of the document.',
  },
  user: {
    type: Object,
    label: 'The user of the document.',
    optional: true,
  },
  'user.emails': { type: Array, optional: true },
  'user.emails.$': { type: Object, optional: true },
  'user.emails.$.address': { type: String, optional: true },
  'user.emails.$.verified': { type: Boolean, optional: true },
  'user.profile': { type: Object, optional: true },
  'user.profile.name': { type: Object, optional: true },
  'user.profile.name.first': { type: String, optional: true },
  'user.profile.name.last': { type: String, optional: true },
  'user.profile.lineId': { type: String, optional: true },
  'user.roles': { type: Array, optional: true },
  'user.roles.$': { type: String, optional: true },
  'user._id': { type: String, optional: true },
  createdDate: { type: String, optional: true },
  shown: { type: Boolean, optional: true },
});

Documents.attachSchema(Documents.schema);

Factory.define('document', Documents, {
  title: () => 'Factory Title',
  year: () => 'Factory Year',
  body: () => 'Factory Body',
  userId: () => 'Factory User ID',
  user: () => 'Factory User',
  createdDate: () => 'Factory Created Date',
  shown: () => 'Factory Shown',
});
