const { createProduct, getAllProducts, getProductById, updateProduct, searchProductByName, deleteProduct,  } = require("../services/product")
const {ensureSignedIn, currentUser} = require("../middleware/authentication")
const upload = require('../middleware/upload');

const express = require('express')
const router = express.Router()

router.get('/', async(req, res) => {
    const products = await getAllProducts();
    if (!products) return res.status(500).json({ error: 'Error fetching products.' });
    res.json(products);
})

     
router.post('/create', ensureSignedIn, upload.array('images'), async (req, res) => {
    const rawProduct = req.body
    const files = req.files
    console.log(rawProduct.data)
    const product = JSON.parse(rawProduct.data)

    const result = await createProduct(product, files);
    if (!result) return res.status(500).json({ error: 'Error creating product.' });

    res.json(result);
})

router.get('/:id', async (req, res) => {
    const objectID = req.params.id;
    const product = await getProductById(objectID)

    if (!product) res.status(500).json({ error: 'Error fetching product.' });
    res.json(product);
})

router.put('/update/:id', ensureSignedIn, async (req, res) => {
    const productID = req.params.id;
    const newProduct = req.body;

    const result = await updateProduct(productID, newProduct);
    if (!result) res.status(500).json({ error: 'Error updating product.' });
    res.json(result);
})

router.get('/search/:id', async (req, res) => {
    const productID = req.params.id;
    const result = await searchProductByName(productID);

    res.json(result)
    
})

router.get('/delete/:id', ensureSignedIn, async (req, res) => {
    const productID = req.params.id;

    const result = await deleteProduct(productID);
    if (!result) res.status(500).json({ error: 'Error deleting product.' });
    res.json(result);
})

module.exports = router;