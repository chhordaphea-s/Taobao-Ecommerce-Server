const { required } = require('joi');
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true,
        default: ""
    },
    price: { 
        type: Number, 
        required: true 
    },
    images: [
        { 
            type: String,
        }
    ],
    size: [
        { 
            type: String,
            required: true,
            default: ["M"],
        }

    ],
    stockQuantity: { 
        type: Number, 
        default: 0 
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    },
    updated_at: { 
        type: Date, 
        default: Date.now 
    },
});

const Product = mongoose.model("products", productSchema);
module.exports = Product;