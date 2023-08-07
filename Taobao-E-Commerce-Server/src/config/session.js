const session = require('express-session');

module.exports = async (app) => {
  const hour = 1000 * 60 * 60;

  app.use(
    session({
      secret: 'S@cretKey', // Replace with a strong secret key
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: hour },
    })
  );

  console.log('In-memory session setup completed.');
};
