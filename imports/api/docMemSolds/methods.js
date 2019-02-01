import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import DocMemSolds from './docMemSolds';
import rateLimit from '../../modules/rate-limit.js';

export const upsertDocMemSold = new ValidatedMethod({
  name: 'docMemSolds.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    docId: { type: String, optional: true },
    memberId: { type: String, optional: true },
    sum: { type: Number, optional: true },
  }).validator(),
  run(docMemSold) {
    return DocMemSolds.upsert({ _id: docMemSold._id }, { $set: docMemSold });
  },
});

rateLimit({
  methods: [
    upsertDocMemSold,
  ],
  limit: 5,
  timeRange: 1000,
});
