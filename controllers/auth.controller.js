const jwt = require('jsonwebtoken');
const config = require("../config").configuration

function generateJWT(_id, email, role) {
    return jwt.sign(
        { userId: _id, email: email, role: role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' } // Adjust the expiration time as needed
    );
}

async function validateJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    let authToken;

    if(authHeader && authHeader.length){
        const tokenParts = authHeader.split(' ');
        if(tokenParts.length == 2){
            authToken = tokenParts[1];
        }
    }
    try{
        await jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET);
        next()
        ;    } catch (e){
        res.status(401).json({
            message: "UNAUTHORIZED"
        })
    }
}

module.exports = {
    generateJWT,
    validateJWT
}
