const User = require('../models/User')
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.authUser = async (req, res) => {

    //check if there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array()})
    }

    //extract email and password
    const {email, password} = req.body

    try {
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({msg: "User does not exist"})
        } 
        
        const passCorrect = await bcryptjs.compare(password, user.password);
        if (!passCorrect) {
            return res.status(400).json({msg: "Password is not correct"})
        }

        // if email and password are correct, create JSON web token

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

    } catch (error) {
        console.log("error")
    }
}

//obtiene que el usuario está autenticado

exports.userAuthentified = async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({user})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'an error ocurred'});
    }
}