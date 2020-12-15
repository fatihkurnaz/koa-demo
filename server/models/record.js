import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const recordSchema = new Schema({
  key: {
    type: String,
    default: uuidv4(),
    required: true
  },
  totalCount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Record', recordSchema);
