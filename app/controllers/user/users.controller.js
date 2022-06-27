/* eslint-disable prefer-const */
/* eslint-disable require-jsdoc */
import {createRequire} from 'module';
const required = createRequire(import.meta.url);
const config = required('../../config/config.json');
import {User} from '../../helpers/database_helper.js';
import bcrypt from 'bcryptjs';
const {compareSync} = bcrypt;
import jsonwebtoken from 'jsonwebtoken';
const {sign} = jsonwebtoken;
export {
  getUserData,
  createUserWithUsernameAndPassword,
  loginWithUsernameAndPassword,
};
import {ObjectId} from 'mongodb';

/**
 * Create a new user.
 * @param {any} userParam response object.
 * @return {any} response object.
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

async function getUserData(req, res) {
  try {
    console.log(ObjectId(req.params.id));
    const user = await User.findById(ObjectId(ObjectId(req.params.id)));
    if (user!=null) {
      res.status(200).send(
          {
            userdata: user,
          },
      );
    } else {
      res.status(201).send({
        message: 'User dosent exist',
        error: 'User dosent exist',
      });
    }
  } catch (e) {
    res.status(202).send({
      message: 'Unexpected Error',
      error: e.toString(),
      id: ObjectId(req.params.id),
    });
  }
}

async function createUserWithUsernameAndPassword(req, res) {
  const {email, password}=req.body;
  try {
    if (email!=null&&password!=null) {
      const user = await User.findOne({'email': email});
      if (user) {
        res.status(201).send({
          'message': 'User Exists try another email or login',
        });
      } else {
      // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await create({
          'username': email,
          'firstName': req.body.firstName,
          'lastName': req.body.lastName,
          'email': email,
          'phoneNumber': req.body.phoneNumber,
          'collageCode': req.body.collageCode,
          'yearOfAdmission': req.body.yearOfAdmission,
          'branchCode': req.body.branchCode,
          'rollNo': req.body.rollNo,
          'imageUrl': req.body.imageUrl,
          'tagId': req.body.tagId,
          'stayId': req.body.stayId,
          'password': hashedPassword,
        });
        res.status(200).send({
          'message': 'Sign up sucessful',
          'success': true,
          'user': newUser,
        });
      }
    } else {
      res.status(201).send({
        'message': 'Invalid email or password',
      });
    }
  } catch (e) {
    res.status(500).send({
      'message': 'Unexpected error occured',
      'error': e.toString(),

    });
  }
}


async function loginWithUsernameAndPassword(req, res) {
  const {email, password} = req.body;
  try {
    if (email != null && password != null) {
      const user = await User.findOne({'email': email});
      if (user) {
        if (compareSync(password, user.password)) {
          const token =
            sign({sub: user.id}, config.secret, {expiresIn: '300d'});
          res.status(200).send({
            'message': 'Login sucessful',
            'success': true,
            'user': user,
            'token': token,
          });
        } else {
          res.status(201).send({
            'message': 'Invalid email or password',
          });
        }
      } else {
        res.status(201).send({
          'message': 'Invalid email or password',
        });
      }
    } else {
      res.status(201).send({
        'message': 'Invalid email or password',
      });
    }
  } catch (e) {
    res.status(500).send({
      'message': 'Unexpected error occured',
      'error': e.toString(),

    });
  }
}
