const mongoose = require('mongoose');
const cart = require('../models/cart')

const listProductsInCart = async (userIdStr) => {
    try {
      const userId = new mongoose.Types.ObjectId(userIdStr)
      console.log("userId: ", userId)
      let cartDB = await cart.findOne({ userId }).populate('items.productId', 'title price images');
      

      return {
        success: true,
        data: cartDB.items || []
      };
    } catch (error) {
      console.error('Error listing products in cart:', error);
      throw error;
    }
  }

  const createCart = async (userId) => {
    try {
      const newCart = new cart({
        userId: userId,
        items: [], // You can initialize the items array as empty for a new cart
      });
  
      const savedCart = await newCart.save();
  
      console.log('New cart created:', savedCart);
      return {
        success: true,
        data: savedCart
      };
    } catch (error) {
      console.error('Error creating cart:', error);
      throw error;
    }
  };
  
const addProductToCart = async (userId, productId, quantity = 1, size) => {
    try {

      console.log("userID: ", userId)
      let cartDB = await cart.findOne({ userId });

    const productIndex = cartDB.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex !== -1) {
      cartDB.items[productIndex].quantity += quantity;
    } else {
      cartDB.items.push({ productId,  quantity, size });
    }

    const updatedCart = await cartDB.save();
    
      return {
        success: true,
        data: updatedCart.items,
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      throw error;
      }
  }
  


const removeProductFromCart = async (userId, productId) => {
    try {
      const userCart = await cart.findOne({ userId });
  
      if (!userCart) {
        throw new Error('Cart not found');
      }
  
      const productIndex = userCart.items.findIndex(item => item.productId.equals(productId));
  
      if (productIndex !== -1) {
        userCart.items.splice(productIndex, 1);
        await userCart.save();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error removing product from cart:', error);
      throw error;
    }
  }

  const removeAllItemsFromCart = async (userId) => {
    try {
      const userCart = await cart.findOne({ userId });
  
      if (!userCart) {
        throw new Error('Cart not found');
      }
  
      // Remove all items from the cart by setting the items array to an empty array
      userCart.items = [];
  
      // Save the updated cart with no items
      await userCart.save();
  
      return true;
    } catch (error) {
      console.error('Error removing all items from cart:', error);
      throw error;
    }
  };
  
module.exports = {listProductsInCart, addProductToCart, removeProductFromCart, createCart, removeAllItemsFromCart}