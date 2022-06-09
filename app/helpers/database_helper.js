
import pkg from 'mongoose';
const { connect } = pkg;
// import {MongoClient} from 'mongodb';
import Product from '../model/products/product.model.js';
import { Attributes } from '../model/attributes/attributes_model.js';
import User from '../model/users/user.model.js';
import Stock from '../model/stock/stock.model.js';
import Category from '../model/category/category.model.js';
import Banner from '../model/banners/banner.model.js';

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const CONNECTION_URL = 'mongodb+srv://allenp:mbits1111@cluster0.ip2' +
            'ag.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// Agenda.connect(CONNECTION_URL).then(console.log('Scheduler running.'));

connect(CONNECTION_URL, connectionOptions)
  .then((e) => {
    console.log('Connected to database');
  })
  .catch((error) => console.log(error.message));

export { Product, Attributes, User, Stock, Category, Banner };
