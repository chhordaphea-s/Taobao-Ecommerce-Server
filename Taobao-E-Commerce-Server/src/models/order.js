const mongoose = require("mongoose");

// Define the schema for the Order collection
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", // Reference to the "User" model, assuming you have a "User" model defined
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
            size: {
                type: String,
            },
        },
    ],
    subTotal: {
        type: Number,
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    shipping: {
        email: { type: String },
        shipingAddress: {
            firstName: { type: String },
            lastName: { type: String },
            company: { type: String },
            address: { type: String },
            apt: { type: String },
            country: { type: String },
            state: { type: String },
            zip: { type: Number },
        },

        shipppingMethode: {
            title: {
                type: String,
            },

            price: {
                type: Number,
                default: 0,
            },
        },
    },
    tax: {
        type: Number,
        default: 0,
    },
    billingaddress: {
        firstName: { type: String },
        lastName: { type: String },
        company: { type: String },
        address: { type: String },
        apt: { type: String },
        country: { type: String },
        state: { type: String },
        zip: { type: Number },
    },
    paymentmethod: {
        cardNumber: {
            type: String,
            unique: true,
        },
        cardHolderName: {
            type: String,
        },
        expirationDate: {
            type: Date,
        },
        cvv: {
            type: String,
        },
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
    },
});

const Order = mongoose.model("order", orderSchema);
module.exports = Order;
