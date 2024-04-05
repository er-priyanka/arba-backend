require('dotenv').config();
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) =>{
    const token = req.headers['authorization'];

    if(!token){
        return res.status(401).json({message: "Unauthorized user!"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        
        // console.log(decoded);
        req.user = { userID: decoded.userID};
        next();

    }catch(err){
        return res.status(403).json({message: "Invalid token"});
    }
}

module.exports = { authenticate };