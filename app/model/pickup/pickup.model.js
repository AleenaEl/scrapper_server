import pkg from 'mongoose';
const {Schema: _Schema, model} = pkg;
const Schema = _Schema;

const schema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  category: {type: String, required: true},
  imageUrl: {type: String, required: true},
  price: {type: Number, required: true},
  pickupTime: {type: String, require: true},
  data: {type: Schema.Types.Mixed},
});

export default model('Pickup', schema);
