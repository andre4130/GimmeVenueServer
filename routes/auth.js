// routes for authentication
const express = require ('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

//create an user

//api/auth

router.post('/', authController.authUser);

// gets authenticated user
router.get('/', 
    auth,
    authController.userAuthentified
);

module.exports = router;