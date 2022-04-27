require('dotenv').config();
const axios = require('axios');

const postSignUp = async (req) => {
  return await axios.post(process.env.service_url + '/signup', {
    firstName: req.body.fname,
    lastName: req.body.lname,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    email: req.body.email,
    password: req.body.password,
  });
};

const postLogin = async (req) => {
  return await axios.post(process.env.service_url + '/login', {
    email: req.body.email,
    password: req.body.password,
  });
};

const getProfile = async (req) => {
  axios.defaults.headers.get['Authorization'] = `${req.headers.authorization}`;
  return await axios.get(process.env.service_url + '/profile');
};

module.exports = { postLogin, postSignUp, getProfile };
