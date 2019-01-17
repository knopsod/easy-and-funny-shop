import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Members from './members';
import rateLimit from '../../modules/rate-limit.js';

export const upsertMember = new ValidatedMethod({
  name: 'members.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    title: { type: Number, optional: true },
    body: { type: String, optional: true },
    userId: { type: String, optional: true },
  }).validator(),
  run(member) {
    return Members.upsert({ _id: member._id }, { $set: member });
  },
});

export const removeMember = new ValidatedMethod({
  name: 'members.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Members.remove(_id);
  },
});

rateLimit({
  methods: [
    upsertMember,
    removeMember,
  ],
  limit: 5,
  timeRange: 1000,
});
