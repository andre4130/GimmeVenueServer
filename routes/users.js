// routes for users
const express = require ('express');
const router = express.Router();
const userController = require ('../controllers/userController')
const { check } = require('express-validator');

//create an user
//api/users

router.post('/', [
    
    check('username', 'username is mandatory').not().isEmpty(),
    check('email', 'please add a valid email').isEmail(),
    check('password', 'password must have at least 6 characters').isLength({min: 6})
],
userController.createUser);

module.exports = router;