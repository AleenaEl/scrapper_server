/* eslint-disable require-jsdoc */
import {createRequire} from 'module';
const required = createRequire(import.meta.url);
import {User} from '../../helpers/database_helper.js';
import bcrypt from 'bcryptjs';
const {compareSync} = bcrypt;
import jsonwebtoken from 'jsonwebtoken';
const {sign} = jsonwebtoken;
export {getUserData, create};

async function getUserData(req, res) {
  const id = req.query.id;
  const user = await User.findOne({id});
  if (user) {
    console.log('User already exists');
    if (user) {
      res.status(200).send({
        ...user.toJSON(),
      });
    }
  } else {
    console.log('The  user dosent exist');
    res.status(200).send({
      message: 'User dosent exist',
      error: 'User dosent exist',
    });
  }
}

/**
 * Function to create a new user.
 * @param {any} userParam object.
 * @return {User} response object.
*/
async function create(userParam) {
  if (await User.findOne({username: userParam.username})) {
    return;
  }
  const user = new User(userParam);
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }
  await user.save();
  return user;
}
