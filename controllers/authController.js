const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 

const registerUser = async (req, res) => {
    try{
        const {username, email, password} = req.body;
        
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: 'User already exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({username, email, password: hashedPassword});
        await newUser.save();

        const token = jwt.sign(
            {id:newUser._id, email:newUser.email, role:newUser.role},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        );

        res.status(201).json({message: "User Registered Succesfully", token});
    }
    catch(err){
        res.status(500).json({message: "Internal server error", err: err.message});
    }
};

const loginUser = async (req, res) => {
    try{
        const{userName, password, email} = req.body;
        const userExist = await User.findOne(email);
        if(!userExist){
            return res.status(404).json({message: 'User does not exist'});
        }

        const isMatch = await bcrypt.compare(password, userExist.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid Password"});
        }

        const token = jwt.sign(
            {id: userExist._id, email: userExist.email, role: userExist.role},
            process.env.JWT_SECRET,
            {expiresIn: process.eventNames.JWT_EXPIRES_IN}
        );

        res.status(200).json({message: "Login Successful", token});
    }
    catch(err){
        res.status(500).json({message: "Internal server error", err: err.message});
    }
};

module.exports = { registerUser, loginUser };