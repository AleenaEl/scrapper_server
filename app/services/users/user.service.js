import bcrypt from 'bcryptjs';
import {User} from '../../helpers/database_helper.js';

export {getAll, getById, update, deleteUser};

/**
 * Get the list of all users.
 * @param {any} req response object.
 * @param {any} res response object.
 * @return {any} response object.
*/
async function getAll() {
  return await User.find();
}

/**
 * Find a user by id.
 * @param {any} id response object.
 * @return {any} response object.
*/
async function getById(id) {
  return await User.findById(id);
}

/**
 * Update a user object.
 * @param {any} id response object.
 * @param {any} userParam response object.
 * @return {any} response object.
*/
async function update(id, userParam) {
  const user = await User.findById(id);
  if (!user) return;
  if (user.username !== userParam.username &&
        await User.findOne({username: userParam.username})) {
    return;
  }
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }
  Object.assign(user, userParam);
  await user.save();
}

/**
 * Handle Errors {Validation, UnAuthorized}.
 * @param {any} id response object.
 * @return {any} response object.
*/
async function deleteUser(id) {
  await User.findByIdAndRemove(id);
}
