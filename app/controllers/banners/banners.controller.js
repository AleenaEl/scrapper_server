import {Banner as _Banner} from '../../helpers/database_helper.js';
const Banner = _Banner;
export {
  addBanners,
  getBanners,
  getBannersById,
  updateBanners,
  deleteBanners,
};
/**
 * Handle Errors {Validation, UnAuthorized}.
 * @param {any} req response object.
 * @param {any} res response object.
 * @return {any} response object.
*/
async function addBanners(req, res) {
  try {
    const newBanner = new Banner(req.body);
    await newBanner.save();
    res.status(200).json(newBanner);
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
async function getBanners(req, res) {
  try {
    const foundBanner = await Banner.find();
    res.status(200).json({
      count: foundBanner.length,
      banners: foundBanner,
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
async function getBannersById(req, res) {
  try {
    // get banner with id of req.params.id
    const foundBanner = await Banner.findById(req.params.id);
    res.status(200).json(foundBanner);
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
async function updateBanners(req, res) {
  try {
    // update banner with id of req.params.id
    const foundBanner = await Banner.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json({
      'message': 'Banner updated successfully',
      'banner': foundBanner,
    });
  } catch (error) {
    res.status(201).json({error: error.message});
  }
}

async function deleteBanners(req, res) {
  try {
    // delete banner with id of req.params.id
    const foundBanner = await Banner.findByIdAndDelete(req.params.id);
    res.status(200).json({
      'message': 'Banner deleted successfully',
      'count': foundBanner,
    });
  } catch (error) {
    res.status(201).json({error: error.message});
  }
}
