const userRepo = require('../repositories/userRepository');

const profileDetails = async(userId)=>{
    return await userRepo.userDetails(userId);
}

module.exports = {
    profileDetails
};