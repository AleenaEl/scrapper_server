/* eslint-disable require-jsdoc */
import {Post as _Post} from '../../helpers/database_helper.js';
const Post = _Post;
export {
  addPosts,
  getPosts,
  getPostsById,
  updatePosts,
  deletePosts,
};
/**
 * Handle Errors {Validation, UnAuthorized}.
 * @param {any} req response object.
 * @param {any} res response object.
 * @return {any} response object.
*/
async function addPosts(req, res) {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(201).json({error: error.message});
  }
}

/**
 * Handle Errors {Validation, UnAuthorized}.
 * @param {any} _req response object.
 * @param {any} res response object.
 * @return {any} response object.
*/
async function getPosts(_req, res) {
  try {
    const foundPost = await Post.find();
    res.status(200).json({
      count: foundPost.length,
      Posts: foundPost,
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
async function getPostsById(req, res) {
  try {
    // get Post with id of req.params.id
    const foundPost = await Post.findById(req.params.id);
    res.status(200).json(foundPost);
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
async function updatePosts(req, res) {
  try {
    // update Post with id of req.params.id
    const foundPost = await
    Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json({
      'message': 'Post updated successfully',
      'Post': foundPost,
    });
  } catch (error) {
    res.status(201).json({error: error.message});
  }
}

async function deletePosts(req, res) {
  try {
    // delete Post with id of req.params.id
    const foundPost = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({
      'message': 'Post deleted successfully',
      'count': foundPost,
    });
  } catch (error) {
    res.status(201).json({error: error.message});
  }
}
