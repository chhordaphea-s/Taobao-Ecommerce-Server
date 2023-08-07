const { createOrder, updateOrder, deleteOrder, getOrdersByUser, getOrderById} = require('../services/order');
const {ensureSignedIn, currentUser} = require('../middleware/authentication');
const { getMe } = require('../services/user');

const express = require('express');
const router = express.Router();

router.get('/', ensureSignedIn, currentUser, async(req, res) => {
    const { currentUser } = req
    const user = await getMe(currentUser.email)

    const result = await getOrdersByUser(user.data._id) 
    res.json(result)
})

router.get('/:id', ensureSignedIn, async(req, res) => {
    const orderID = req.params.id;

    const result = await getOrderById(orderID)
    res.json(result)
})

router.post('/create', ensureSignedIn, currentUser, async (req, res) => {
    const newOrder = req.body
    const { currentUser } = req

    const user = await getMe(currentUser.email)
    
    console.log("order: ", req.body);

    const result = await createOrder(user.data, newOrder) 
    if (!result) res.status(500).json({ error: 'Error creating order.' });
    res.json(result)
})

router.put('/update/:id', ensureSignedIn, async (req, res) => {
    const newOrder = req.body
    const orderId = req.params.id
    const result = await updateOrder(orderId, newOrder) 
    if (!result) res.status(500).json({ error: 'Error creating order.' });
    res.json(result)
})

router.get('/delete/:id', ensureSignedIn, async (req, res) => {
    const orderID = req.params.id;

    const result = await deleteOrder(orderID);
    if (!result) res.status(500).json({ error: 'Error deleting product.' });
    res.json(result);

})




module.exports = router;