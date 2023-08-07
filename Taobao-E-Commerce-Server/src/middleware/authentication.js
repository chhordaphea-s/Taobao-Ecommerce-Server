const Jwt = require('jsonwebtoken')

const ensureSignedIn = (req, res, next) => {
    if (!req.session.jwtToken) {
        return res.json({
            success: false,
            error:`You must sign In`
        })
    }
    next();
}

const ensureSignedOut = (req, res, next) => {
    if (req.session.jwtToken) {
        return res.json({
            success: false,
            error: `You already signed in`
        })
    }
    next();
}
const currentUser = (req, res, next) => {
    if (!req.session.jwtToken)
      throw "You must sign In~"
    const user = Jwt.verify(req.session.jwtToken, 'S@ecret')
    console.log("User: ", user)
    req.currentUser = user;
    next()
}



module.exports = {
    ensureSignedIn,
    ensureSignedOut,
    currentUser
}