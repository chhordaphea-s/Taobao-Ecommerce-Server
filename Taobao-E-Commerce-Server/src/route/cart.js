const express = require('express')
const { ensureSignedIn, currentUser } = require('../middleware/authentication');
const { listProductsInCart, addProductToCart, removeProductFromCart, removeAllItemsFromCart } = require('../services/cart');
const { getMe } = require('../services/user');
const router = express. Router()

router.get('/', ensureSignedIn, currentUser, async (req, res) => {
    const { currentUser } = req;
    const user = await getMe(currentUser.email)

    const result = await listProductsInCart(user.data._id)
    res.send(result)
})

router.post('/addtocart', ensureSignedIn, currentUser, async (req, res) => {
    const { currentUser } = req;
    const user = await getMe(currentUser.email)

    const { product, quantity, size } = req.body
    // console.log(`{ ${product}, ${quantity}, ${size} }`)
    const result = await addProductToCart(user.data._id, product._id, quantity, size)
    res.send(result)
})

router.delete('/delete/:id', ensureSignedIn, currentUser, async (req, res)=> {
    const { currentUser } = req;
    const user = await getMe(currentUser.email)

    const product = req.body
    const result = await removeProductFromCart(user.data._id, product._id)

    res.send(result)
})


router.delete('/reset', ensureSignedIn, currentUser, async (req, res) => {
    const { currentUser } = req;
    const user = await getMe(currentUser.email);
  
    const result = await removeAllItemsFromCart(user.data._id);
  
    res.send(result);
})

module.exports = router