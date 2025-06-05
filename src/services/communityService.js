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
    try{
        const community = await communityRepo.getCommunityById(id);
        return addBannerAvatar(community);
    }catch(err){

    }
}
const getCommunitiesByName = async(name)=>{
    return communityRepo.getCommunitiesByName(name);
}
const myCommunities = async(userId)=>{
    try{
        const communities = await communityRepo.myCommunities(userId);
        return addBannerAvatar(communities);
    }catch(err){

    }
}
const recommendations = async(userId)=>{
    try{
        const communities = await communityRepo.recommendations(userId);
        return addBannerAvatar(communities);
    }catch(err){

    }
}
const addBannerAvatar = async(input)=>{
    try{
        if (Array.isArray(input)) {
            return Promise.all(
              input.map(async (community) => {
                community.bannerUrl = await S3.getPreSignedUrl('banner', community._id, 'get');
                community.avatarUrl = await S3.getPreSignedUrl('avatar', community._id, 'get');
                return community;
              })
            );
          } else {
            input.bannerUrl = await S3.getPreSignedUrl('banner', input._id, 'get');
            input.avatarUrl = await S3.getPreSignedUrl('avatar', input._id, 'get');
            return input;
          }
    }catch(err){

    }
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