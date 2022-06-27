
import pkg from 'mongoose';
const {connect} = pkg;
import User from '../model/users/user.model.js';
import Banner from '../model/banners/banner.model.js';

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const CONNECTION_URL = 'mongodb+srv://abin:hostler123@hostler.sqnuxtv.mongodb.net/?retryWrites=true&w=majority';


connect(CONNECTION_URL, connectionOptions)
    .then((_e) => {
      console.log('Connected to database');
    })
    .catch((error) => console.log(error.message));

export {User, Banner};
