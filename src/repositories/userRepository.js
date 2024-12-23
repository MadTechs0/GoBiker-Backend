const User = require('../models/user');

const findByEmail = async(email) => await User.findOne({email});
const createUser = async(userData) => {
    const user = new User(userData);    
    return await user.save();
};
const userDetails = async(id) =>{
    return await User.findById(id).select('name userName email phone');
}

module.exports = {
    findByEmail,
    createUser,
    userDetails
};