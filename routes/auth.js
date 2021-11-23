const express = require('express');
const router = express.Router();

// Importing controllers 
const authController = require('../controllers/authControllers');
const apiController = require('../controllers/apiController');

// Importing middleware to check users authentication
const auth = require('../middleware/auth');

const Authenticate = require('../middleware/authenticate');

// Routes 
router.post('/register', authController.signup);

router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.get('/getapidata' , auth, apiController.getFetchData);

// router.get('/getapidata' , apiController.getFetchData);

module.exports = router;