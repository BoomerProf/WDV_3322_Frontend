const express = require('express');
const {
  postSignUp,
  postLogin,
  getProfile,
} = require('../api/services/userService');
const router = express.Router();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const { validateLogin, validateSignup } = require('../validation/validation');

router.use(cookieParser());

router.get('/signup', (req, res, next) => {
  res.render('signup', {
    pagename: 'Sign Up',
    token: false,
  });
});

router.get('/', (req, res, next) => {
  let value = req.cookies.token !== undefined ? true : false;
  res.render('home', {
    pagename: 'Home',
    token: value,
  });
});

router.get('/login', (req, res) => {
  res.render('login', {
    pagename: 'Login',
    token: false,
  });
});

router.get('/profile', async (req, res) => {
  req.headers.authorization = 'Bearer ' + req.cookies.token;
  // call database to get profile from user collection
  getProfile(req)
    .then((result) => {
      res.render('profile', {
        pagename: 'Profile',
        message: 'Success',
        email: result.data.message.email,
        token: true,
        name: result.data.message.name,
      });
    })
    .catch((err) => {});
});

router.post('/login', (req, res) => {
  const errors = validateLogin(req);
  if (Object.keys(errors).length !== 0) {
    res.render('login', {
      pagename: 'Login',
      body: req.body,
      message: errors.status,
      errs: errors,
    });
  } else {
    postLogin(req)
      .then((result) => {
        res.cookie('token', result.data.token, {
          maxAge: 900000,
          httpOnly: true,
        });
        res.render('profile', {
          pagename: 'Profile',
          message: result.data.message,
          token: true,
          email: req.body.email,
          name: result.data.name,
        });
      })
      .catch((err) => {
        res.render('login', {
          pagename: 'Login',
          body: req.body,
          message: 'Unable to login user: ' + req.body.email,
        });
      });
  }
});

router.post('/signup', (req, res) => {
  const errors = validateSignup(req);
  if (Object.keys(errors).length !== 0) {
    res.render('signup', {
      pagename: 'Sign Up',
      body: req.body,
      message: errors.status,
      errs: errors,
    });
  } else {
    // call service
    postSignUp(req)
      .then((result) => {
        if (result.status === 201) {
          res.render('login', {
            pagename: 'Login',
            message: result.data.message,
            token: false,
          });
        } else {
          res.render('signup', {
            pagename: 'Sign Up',
            message: result.data.message,
            token: false,
          });
        }
      })
      .catch((err) => {
        res.render('signup', {
          pagename: 'Sign Up',
          message: err.response.data.message,
        });
      });
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.render('home', {
    pagename: 'Home',
    token: false,
  });
});

module.exports = router;
