import pkg from 'mongoose';
const {connect} = pkg;
import User from '../model/users/user.model.js';
import Banner from '../model/banners/banner.model.js';
import Post from '../model/post/post.model.js';
import Cart from '../model/cart/cart.model.js';
import Pickup from '../model/pickup/pickup.model.js';
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const CONNECTION_URL = 'mongodb+srv://aleena:alel123@cluster0.phzomxt.mongodb.net/scrap';

connect(CONNECTION_URL, connectionOptions)
    .then((_e) => {
      console.log('Connected to database');
    })
    .catch((error) => console.log(error.message));

export {User, Banner, Post, Cart, Pickup};
