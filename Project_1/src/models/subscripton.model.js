import mongoose, { Schema } from 'mongoose';

const subsciptionSchema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId, //one who subscribing
      ref: 'User',
    },
    channel: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timeseries: true,
  }
);

export const Subsciption = mongoose.model('Subsciption', subsciptionSchema);
