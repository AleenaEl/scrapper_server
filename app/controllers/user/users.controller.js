/* eslint-disable require-jsdoc */
// import {createRequire} from 'module';
import {createRequire} from 'module';
const required = createRequire(import.meta.url);
const config = required('../../config/config.json');
const _secret = config.secret;
import {User} from '../../helpers/database_helper.js';
import bcrypt from 'bcryptjs';
const {compareSync} = bcrypt;
import jsonwebtoken from 'jsonwebtoken';
const {sign} = jsonwebtoken;


export {
  getUserData,
  hello,
  createUserWithUsernameAndPassword,
  loginWithUsernameAndPassword,
};
// {
//           console.log('New User');
//           console.log(req.body);
//           const newUser = await create({
//             'username': req.query.phoneNumber,
//             'firstName': 'User',
//             'lastName': req.query.phoneNumber,
//             'phoneNumber': req.query.phoneNumber,
//           });
//           const token =
//             sign({ sub: newUser.id }, config.secret, { expiresIn: '300d' });
//           res.status(200).send({
//             message: 'Login Sucess.',
//             ...newUser.toJSON(),
//             token,
//           });
//         }

async function hello(req, res) {
  res.status(200).json({
    'message': 'Hello, ' +req.query.name+' welcome to scrapper server!',
  });
}
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
        const newUser = await User({
          'username': email,
          'email': email,
          'password': hashedPassword,
        }).save();
        const token =
            sign({sub: newUser.id}, _secret, {expiresIn: '300d'});
        res.status(200).send({
          'message': 'Sign up sucessful',
          'success': true,
          'user': newUser,
          'token': token,
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
            sign({sub: user.id}, _secret, {expiresIn: '300d'});
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
        res.status(202).send({
          'message': 'Invalid email or password',
        });
      }
    } else {
      res.status(203).send({
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
