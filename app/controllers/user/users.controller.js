/* eslint-disable require-jsdoc */
import { createRequire } from 'module';
const required = createRequire(import.meta.url);
const config = required('../../config/config.json');
const client =
  required('twilio')('AC2883c66110a6f55e8d3dc0d8748014e0',
    '83bab2d1ca6ecc338fab046af8650743');
import { User } from '../../helpers/database_helper.js';
import bcrypt from 'bcryptjs';
const { compareSync } = bcrypt;
import jsonwebtoken from 'jsonwebtoken';
const { sign } = jsonwebtoken;
export { getUserData, phoneAuthenticateLogin, phoneAuthenticateVerify };
import { create } from '../../services/users/user.service.js';


/**
 * Send Otp to the phone number.
 * @param {any} req request body.
 * @param {any} res response object.

 */
async function phoneAuthenticateLogin(req, res) {
  if (req.query.phoneNumber) {
    try {
      const data = await client
        .verify
        .services('VA8741c535d3b4f2ea367e6ca410bdb31b')
        .verifications
        .create({
          to: `+${req.query.phoneNumber}`,
          channel: req.query.channel === 'call' ? 'call' : 'sms',
        });
      res.status(200).send({
        message: 'OTP has been send to your number {`phoneNumber`} ',
        data,
      });
    } catch (e) {
      console.log(e);
      res.status(400).send({
        error: 'Failed to send OTP',
        message: e.message,
      });
    }
  } else {
    res.status(400).send({
      message: 'Wrong phone number :(, phoneNumber felid is required',
      phoneNumber: req.query.phoneNumber,
    });
  }
}

async function phoneAuthenticateVerify(req, res) {
  if (req.query.phoneNumber && (req.query.code).length === 6) {
    try {
      let verification;
      console.log(req.query.phoneNumber);
      verification = await client
        .verify
        .services('VA8741c535d3b4f2ea367e6ca410bdb31b')
        .verificationChecks
        .create({
          to: `+${req.query.phoneNumber}`,
          code: req.query.code,
        });
      if (verification.status === 'approved') {
        const user = await User.findOne({ username: req.query.phoneNumber });
        if (user) {
          console.log('User already exists');
          if (user) {
            const token =
              sign({ sub: user.id }, config.secret, { expiresIn: '300d' });
            res.status(200).send({
              message: 'Login Sucess',
              ...user.toJSON(),
              token,

            });
          }
        } else {
          console.log('New User');
          console.log(req.body);
          const newUser = await create({
            'username': req.query.phoneNumber,
            'firstName': 'User',
            'lastName': req.query.phoneNumber,
            'phoneNumber': req.query.phoneNumber,
          });
          const token =
            sign({ sub: newUser.id }, config.secret, { expiresIn: '300d' });
          res.status(200).send({
            message: 'Login Sucess.',
            ...newUser.toJSON(),
            token,
          });
        }
      } else {
        res.status(200).send({
          'error': 'Invalid OTP or OTP Timed Out.',
          'verification': verification,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(402)
        .send({ 'message': 'Fuck something went wrong.', 'error': err });
    }
  }
}

async function getUserData(req, res) {
  const id = req.query.id;
  const user = await User.findOne({ id });
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