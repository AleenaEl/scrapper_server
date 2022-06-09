import expressJwt from 'express-jwt';
import {createRequire} from 'module';
const required = createRequire(import.meta.url);
const config = required('../config/config.json');
const _secret = config.secret;
import {getById} from '../services/users/user.service.js';

export default jwt;

/**
 * JWT Authentication gateway.
 * @param {any} err request body.
 * @param {any} req response object.
 * @param {any} res response object.
 * @param {any} next next object.
 * @return {any} response object.
*/
function jwt() {
  const secret = _secret;
  return expressJwt({secret, algorithms: ['HS256'], isRevoked}).unless({
    path: [
      '/users/register',
      '/users/login',
      '/users/verify',
      '/test',
      '/profile',
      '/images',
      '/post',
    ],
  });
}

/**
 * Check if JWT Token is revoked.
 * @param {any} req request object.
 * @param {any} payload parsed data from header object.
 * @param {any} done object.
 * @return {any} response object.
*/
async function isRevoked(req, payload, done) {
  const user = await getById(payload.sub);
  if (!user) {
    return done(null, true);
  }
  done();
}

