
import pkg from 'mongoose';
const {connect} = pkg;
// import {MongoClient} from 'mongodb';
import User from '../model/users/user.model.js';
import Banner from '../model/banners/banner.model.js';
import Post from '../model/post/post.model.js';

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const CONNECTION_URL = 'mongodb+srv://aleena:alel123@cluster0.phzomxt.mongodb.net/admin';
// Agenda.connect(CONNECTION_URL).then(console.log('Scheduler running.'));
connect(CONNECTION_URL, connectionOptions)
    .then((_e) => {
      console.log('Connected to database');
    })
    .catch((error) => console.log(error.message));

export {User, Banner, Post};
