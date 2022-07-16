import pkg from 'mongoose';
const {Schema: _Schema, model} = pkg;
const Schema = _Schema;

const schema = new Schema({
  userId: {type: String, required: true},
  item: {type: String, required: true},
  qty: {type: Number, required: true},
});

export default model('Cart', schema);
