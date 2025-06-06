const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) =>{
    try{
        const token = req.header('Authorization')?.split(' ')[1];
        if(!token){
            return res.status(401).json({message: "Unauthorized"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({message:'Session expired'});
    }
};

module.exports = {
    authenticate
};