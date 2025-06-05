const userRepo = require('../repositories/userRepository');
const S3 = require('../services/s3Service');
const profileDetails = async(userId)=>{    
    const userDetails = await userRepo.userDetails(userId);
    userDetails.profileUrl = await S3.getPreSignedUrl('profile', userId, 'get'); 
    return userDetails;
}

module.exports = {
    profileDetails
};