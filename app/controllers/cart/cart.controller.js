import {Cart as _Cart, Post as _Post} from '../../helpers/database_helper.js';
const Cart = _Cart;
const Post = _Post;

export {
  addCart,
  getCartById,
  updateCart,
  deleteCart,
};
/**
 * Handle Errors {Validation, UnAuthorized}.
 * @param {any} req response object.
 * @param {any} res response object.
 * @return {any} response object.
*/
async function addCart(req, res) {
  try {
    const {item, userId, qty} = req.body;
    const foundCart = await Cart.findOne({item: item, userId: userId});
    if (foundCart == null) {
      const newCart = new Cart(req.body);
      await newCart.save();
      res.status(200).json({'data': newCart, 'mode': 'New'});
    } else {
      await foundCart.delete();
      const newCart = new Cart(req.body);
      await newCart.save();
      res.status(200).json({'data': newCart, 'mode': 'Update', 'qty': qty});
    }
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
async function getCartById(req, res) {
  try {
    // get Cart with id of req.params.id
    const foundCart = await Cart.find({userId: req.params.id});
    const items = [];
    for (let i = 0; i < foundCart.length; i++) {
      items.push(foundCart[i].item);
    }
    const itemsInCart = await Post.find({'_id': {'$in': items}});
    res.status(200).json({'items': itemsInCart, 'ids': items});
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
async function updateCart(req, res) {
  try {
    // update Cart with id of req.params.id
    // eslint-disable-next-line max-len
    const foundCart = await Cart.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json({
      'message': 'Cart updated successfully',
      'Cart': foundCart,
    });
  } catch (error) {
    res.status(201).json({error: error.message});
  }
}

// eslint-disable-next-line require-jsdoc
async function deleteCart(req, res) {
  try {
    // delete Cart with id of req.params.id
    const foundCart = await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({
      'message': 'Cart deleted successfully',
      'count': foundCart,
    });
  } catch (error) {
    res.status(201).json({error: error.message});
  }
}
