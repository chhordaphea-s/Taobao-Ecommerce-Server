const express = require('express')
const { ensureSignedIn, currentUser } = require('../middleware/authentication')
const { getMe } = require('../services/user')
const { createCreditCard, getCreditCardByUser, deleteCreditCard } = require('../services/paymentMethos')
const router = express.Router()

router.get('/', ensureSignedIn, currentUser, async (req, res) => {
    const currentUser = req.user
    const user = getMe(currentUser.email)

    const result = getCreditCardByUser(user.id)
    res.json(result)
})

router.post('/create', ensureSignedIn, currentUser, async (req, res) => {
    const currentUser = req.user
    const user = getMe(currentUser.email)

    const newCreditCard = req.body
    newCreditCard.userId = user.id

    const result = createCreditCard(req.body)
    res.json(result)
})

router.delete('/delete/:id', ensureSignedIn, currentUser, async (req, res) => {
    const creditCardId = req.params.id

    const result = deleteCreditCard(creditCardId)
    res.json(result)
})


module.exports = router