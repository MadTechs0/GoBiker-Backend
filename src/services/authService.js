const userRepo = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const S3 = require('./s3Service');
const register = async(req, res) => {
    try{
        const{ name, userName, email, phone, password} = req.body;
        
        const existingUser = await userRepo.findByEmail(email);
        if(existingUser){
            return res.status(409).json({message:'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userRepo.createUser({name, userName, email, phone, password:hashedPassword});
        const token = jwt.sign(
            {id: user.id, email: user.email, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        );
        const preSignedUrl = await S3.getPreSignedUrl('profile', user.id, 'put');
        res.status(201).json({message: 'User registered successfully', token:token, profileUploadUrl:preSignedUrl});
    }catch(error){
        res.status(500).json({message: 'Internal server error', error:error});
    }
};

const login = async(req, res)=>{
    try{
        const{userName, email, password} = req.body;
        const user = await userRepo.findByEmail(email);
        
        if(!user){
            return res.status(404).json({message: 'User doest not exist'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({message: 'incorrect password'});
        }
        
        const token = jwt.sign(
            {id: user.id, email: user.email, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        );

        return res.status(200).json({token:token});
    }catch(error){
        return res.status(500).json({message:'Internal server Error', error:error.message});
    }
};
const checkUsernameAvailability = async(userName)=>{    
    return await userRepo.checkUsernameAvailability(userName);
}
const getUserId = async(req,res)=>{
    try{
        const header = req.headers.Authorization;
        let userId = null;
        if(header){
            const token = header.split(" ")[1];
            try{
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                userId = decoded.id;
            }catch(err){
                return userId;
            }
        }else{
            return userId;
        }
    }catch(err){
        return err;
    }
}
module.exports = {
    register,
    login,
    checkUsernameAvailability,
    getUserId
};