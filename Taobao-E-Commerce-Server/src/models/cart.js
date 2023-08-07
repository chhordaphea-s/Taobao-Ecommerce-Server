const mongoose = require('mongoose');

// Define the schema for the Cart collection
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', 
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true,
      },
      size: {
        type: String,
        required: true,
        default: "M",
      },
      quantity: {
        type: Number,
        required: true,
        default: 1, 
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
