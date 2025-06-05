const { get } = require('mongoose');
const communityRepo = require('../repositories/communityRepository');
const S3 = require('./s3Service');

const createCommunity = async(req, res) => {
    try{        
        const {name, description, restricted} = req.body;
        const communityId = await communityRepo.createCommunity({ownerId: req.user.id, name, description, restricted});
        if(!communityId){
            return res.status(500).json({message:'Error creating community'});
        }
        const preSignedUrlBanner = await S3.getPreSignedUrl('banner', communityId, 'put');
        const preSignedUrlAvatar = await S3.getPreSignedUrl('avatar', communityId, 'put');

        return res.status(200).json({bannerUrl:preSignedUrlBanner, avatarUrl:preSignedUrlAvatar});
    }catch(err){
        return res.status(500).json({message:'Internal server error', error:err});
    }
}
const checkNameAvailability = async(name) => {
    return communityRepo.checkNameAvailability(name);
}
const getCommunities = async()=>{
    return communityRepo.getCommunities();
}
const getCommunityById = async(id)=>{
    return communityRepo.getCommunityById(id);
}
const getCommunitiesByName = async(name)=>{
    return communityRepo.getCommunitiesByName(name);
}
const myCommunities = async(userId)=>{
    return communityRepo.myCommunities(userId);
}
const recommendations = async(userId)=>{
    return communityRepo.recommendations(userId);
}
module.exports = {
    createCommunity,
    checkNameAvailability,
    getCommunities,
    getCommunityById,
    getCommunitiesByName,
    myCommunities,
    recommendations
}