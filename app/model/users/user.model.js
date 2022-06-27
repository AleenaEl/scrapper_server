import pkg from 'mongoose';
const {Schema: _Schema, model} = pkg;
const Schema = _Schema;

const schema = new Schema({
  username: {type: String, unique: true, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  phoneNumber: {type: String},
  collageCode: {type: String},
  yearOfAdmission: {type: String},
  branchCode: {type: String},
  rollNo: {type: String},
  imageUrl: {type: String, default: 'https://firebasestorage.googleapis.com/v0/b/hostlr-72ba9.appspot.com/o/Profile_avatar_placeholder_large.png?alt=media&token=4b93d555-529d-42bb-9191-461daaabbf8a'},
  tagId: {type: String},
  stayId: {type: String, required: true},
  password: {type: String, required: true},
});

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function(_doc, ret) {
    delete ret._id;
    delete ret.hash;
  },
});

export default model('User', schema);
