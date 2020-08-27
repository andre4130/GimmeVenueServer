const jwt = require ('jsonwebtoken');

module.exports = function(req, res, next) {
    //reading token from the header
    const token = req.header('x-auth-token');
    console.log(token)

    //check if there is a token
    if(!token) {
        return res.status(401).json({msg: 'No token available'})
    }
    //validate token
    try {
        const cifrado = jwt.verify(token, process.env.SECRET)
        req.user = cifrado.user;
        next()
    } catch (error) {
        res.status(401).json({msg: 'Not a valid token'})
    }
}