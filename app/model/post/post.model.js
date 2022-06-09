import pkg from 'mongoose';
const {Schema: _Schema, model} = pkg;
const Schema = _Schema;

const schema = new Schema({
  heading: {type: String, unique: true, required: true},
  subtitle: {type: String, required: true},
  createdDate: {type: Date, default: Date.now},
});

export default model('Post', schema);
