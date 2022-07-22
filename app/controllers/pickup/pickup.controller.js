import {Pickup as _Pickup} from '../../helpers/database_helper.js';
const Pickup = _Pickup;
export {
  addPickups,
  getPickups,
  getPickupsById,
  updatePickups,
  deletePickups,
};
/**
 * Handle Errors {Validation, UnAuthorized}.
 * @param {any} req response object.
 * @param {any} res response object.
 * @return {any} response object.
*/
async function addPickups(req, res) {
  try {
    const newPickup = new Pickup(req.body);
    await newPickup.save();
    res.status(200).json(newPickup);
  } catch (error) {
    res.status(201).json({error: error.message});
  }
}

/**
 * Handle Errors {Validation, UnAuthorized}.
 * @param {any} req response object.
 * @param {any} res response object.
 * @return {any} response object.
*/
async function getPickups(req, res) {
  try {
    const foundPickup = await Pickup.find();
    res.status(200).json({
      count: foundPickup.length,
      Pickups: foundPickup,
    });
  } catch (error) {
    res.status(201).json({error: error.message});
  }
}

/**
 * Handle Errors {Validation, UnAuthorized}.
 * @param {any} req response object.
 * @param {any} res response object.
 * @return {any} response object.
*/
async function getPickupsById(req, res) {
  try {
    // get Pickup with id of req.params.id
    const foundPickup = await Pickup.findById(req.params.id);
    res.status(200).json(foundPickup);
  } catch (error) {
    res.status(201).json({error: error.message});
  }
}
/**
 * Handle Errors {Validation, UnAuthorized}.
 * @param {any} req response object.
 * @param {any} res response object.
 * @return {any} response object.
*/
async function updatePickups(req, res) {
  try {
    // update Pickup with id of req.params.id
    // eslint-disable-next-line max-len
    const foundPickup = await Pickup.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json({
      'message': 'Pickup updated successfully',
      'Pickup': foundPickup,
    });
  } catch (error) {
    res.status(201).json({error: error.message});
  }
}

// eslint-disable-next-line require-jsdoc
async function deletePickups(req, res) {
  try {
    // delete Pickup with id of req.params.id
    const foundPickup = await Pickup.findByIdAndDelete(req.params.id);
    res.status(200).json({
      'message': 'Pickup deleted successfully',
      'count': foundPickup,
    });
  } catch (error) {
    res.status(201).json({error: error.message});
  }
}
