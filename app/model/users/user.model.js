import pkg from 'mongoose';
const {Schema: _Schema, model} = pkg;
const Schema = _Schema;

const schema = new Schema({
  username: {type: String, unique: true, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  lastUpdated: {type: Date},
  createdDate: {type: Date, default: Date.now},
});

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret) {
    delete ret._id;
    delete ret.hash;
  },
});

export default model('User', schema);
