const { default: mongoose } = require("mongoose");
const Order = require("../models/order");

// Function to create a new order
const createOrder = async (user, order) => {
    try {
        if (!order.products || !order.totalAmount) {
            return {
                sucess: false,
                message: "Missing required data for order creation.",
            };
        }

        order.userId = new mongoose.Types.ObjectId(user._id);

        const newOrder = new Order(order);

        const savedOrder = await newOrder.save();
        return {
            success: true,
            data: savedOrder,
        };
    } catch (error) {
        console.log(error);

        return {
            success: false,
            message: `${error} Error creating order.`,
        };
    }
};

const updateOrder = async (orderId, order) => {
    try {
        const result = await Order.findByIdAndUpdate(orderId, order, {
            new: true,
        });
        if (!result) {
            return {
                success: false,
                message: ` ${error}: Order not found.`,
            };
        }

        return {
            success: true,
            data: result,
        };
    } catch (error) {
        return {
            success: false,
            message: `${error}: Error updating order.`,
        };
    }
};

// Function to delete an existing order
const deleteOrder = async (orderId) => {
    try {
        // Check if the order with the provided ID exists
        const result = await Order.findByIdAndDelete(orderId);
        if (!result) {
            return res.status(404).json({ error: "Order not found." });
        }

        return {
            success: true,
            data: result,
        };
    } catch (error) {
        return {
            success: false,
            message: `${error}: Error deleting order.`,
        };
    }
};

// Function to get all orders
const getAllOrders = async () => {
    try {
        const result = await Order.find();
        return {
            success: false,
            data: result,
        };
    } catch (error) {
        return {
            success: false,
            message: ` ${error}: 'Error fetching all orders.' `,
        };
    }
};

const getOrdersByUser = async (userId) => {
    try {
        const orders = await Order.find({ userId });
        return {
            success: true,
            data: orders || [], // Return empty array instead of null when no results are returned from DB
        };
    } catch (error) {
        return {
            success: false,
            message: ` ${error}: 'Error fetching orders for the user.'`,
        };
    }
};

const getOrderById = async (orderId) => {
    try {
        const result = await Order.findById(orderId);
        if (!result) {
            return {
                success: true,
                error: "Order not found.",
            };
        }
        return {
            success: true,
            data: result,
        };
    } catch (error) {
        return {
            sucess: false,
            error: error,
        };
    }
};

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrdersByUser,
    getOrderById,
    getOrdersByUser,
};
