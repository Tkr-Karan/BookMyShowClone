const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    try {
        const token = req.header.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.jwt_secret_key) 
        req.body.userId = decoded.userId

        next(); 
    } catch (error) {
        res.send({
            success: false,
            message: "Invalid token"
        })
        
    }
}