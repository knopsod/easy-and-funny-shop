import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Documents from './documents';
import rateLimit from '../../modules/rate-limit.js';

export const upsertDocument = new ValidatedMethod({
  name: 'documents.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    title: { type: String, optional: true },
    year: { type: Number, optional: true },
    body: { type: String, optional: true },
    userId: { type: String, optional: true },
    user: { type: Object, optional: true },
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
  }).validator(),
  run(document) {
    return Documents.upsert({ _id: document._id }, { $set: document });
  },
});

export const removeDocument = new ValidatedMethod({
  name: 'documents.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Documents.remove(_id);
  },
});

rateLimit({
  methods: [
    upsertDocument,
    removeDocument,
  ],
  limit: 5,
  timeRange: 1000,
});
