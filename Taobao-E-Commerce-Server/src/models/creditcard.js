const mongoose = require('mongoose');

// Define the schema for the CreditCard collection
const creditCardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the "User" model, assuming you have a "User" model defined
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
    unique: true,
  },
  cardHolderName: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
});

const CreditCard = mongoose.model('creditcard', creditCardSchema);
module.exports = CreditCard;
