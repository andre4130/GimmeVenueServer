const User = require('../models/User')
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.createUser = async (req,res) => {

    //check if there are errors 

    const errors = validationResult(req);
    if (!errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array()})
    }

    const { email, password } = req.body;

    try {
        //Review that the user is unique

        let user = await User.findOne({email});
        
        if(user) {
            return res.status(400).json({ msg: 'User already exists'})
        }

        //creates the new user
        user = new User(req.body); 

        //hash new user password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        //save new user
        await user.save(); 

        // creating  JWT

        const payload = {
            user: {
                id: user.id
            }
        }

        // signing JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;
            //confirmation message
            res.json({token});
        })

        //message
        // res.json({msg: "User has been correctly created"})
    } catch (
    error) {
        console.log("error")
        res.status(400).send("An error happened")
    }
};