import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Solds from './solds';
import rateLimit from '../../modules/rate-limit.js';
import DocMemSolds from '../docMemSolds/docMemSolds';

export const upsertSold = new ValidatedMethod({
  name: 'solds.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    docId: { type: String, optional: true },
    memberId: { type: String, optional: true },
    createdAt: { type: String, optional: true },
    soldDate: { type: String, optional: true },
    amount: { type: Number, optional: true },
    cancelled: { type: Boolean, optional: true },
  }).validator(),
  run(sold) {
    const upserted = Solds.upsert({ _id: sold._id }, { $set: sold });

    const docMemSold = DocMemSolds.findOne({ docId: sold.docId, memberId: sold.memberId });
    
    if (upserted && !docMemSold) {
      DocMemSolds.insert({
        docId: sold.docId,
        memberId: sold.memberId,
        sum: sold.amount,
      });
    } else if (upserted && docMemSold) {
      DocMemSolds.upsert({ 
        _id: docMemSold._id,
      }, {
        $set: {
          docId: sold.docId,
          memberId: sold.memberId,
          sum: docMemSold.sum + sold.amount,
        },
      });
    }

    return upserted;
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
