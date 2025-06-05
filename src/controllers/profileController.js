const profileService = require('../services/profileService');
const getProfileDetails = async(req, res)=>{
    try{
        const user = await profileService.profileDetails(req.user.id);
        if(!user){
            return res.status(404).json('User not found');
        }
        return res.status(200).json({user});
    }catch(err){
        return res.status(500).json({message:'Internal server error', error:err.message});
    }
}

module.exports = {
    getProfileDetails
};