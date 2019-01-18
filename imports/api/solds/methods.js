import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Solds from './solds';
import rateLimit from '../../modules/rate-limit.js';

export const upsertSold = new ValidatedMethod({
  name: 'solds.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    docId: { type: String, optional: true },
    memberId: { type: String, optional: true },
    createdAt: { type: String, optional: true },
    createdDate: { type: String, optional: true },
    amount: { type: Number, optional: true },
    cancelled: { type: Boolean, optional: true },
  }).validator(),
  run(sold) {
    return Solds.upsert({ _id: sold._id }, { $set: sold });
  },
});

export const removeSold = new ValidatedMethod({
  name: 'solds.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Solds.remove(_id);
  },
});

rateLimit({
  methods: [
    upsertSold,
    removeSold,
  ],
  limit: 5,
  timeRange: 1000,
});
