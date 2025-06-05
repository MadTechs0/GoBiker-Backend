const communityService = require('../services/communityService');
const authService = require('../services/authService');

const createCommunity = async(req, res)=>{
    return await communityService.createCommunity(req, res);
}

const checkNameAvailability = async(req, res)=>{
    try{
            const name = req.query.communityName;
            const availability = await communityService.checkNameAvailability(name);
            return res.status(200).json({isAvailable:availability});
        }catch(error){
            return res.status(500).json({message:'Internal server Error', error:error.message});
        }
}
const communities = async(req, res)=>{
    try{
        const communities = await communityService.getCommunities();
        return res.status(200).json({communities:communities});
    }catch(err){
        return res.status(500).json({message:'Internal Server Error', error:err});
    }
}
const communityById = async(req, res)=>{
    try{
        const id = req.query.id;
        const community = await communityService.getCommunityById(id);
        return res.status(200).json({community:community});
    }catch(err){
        return res.status(500).json({message:'Internal Server Error', error:err});
    }
}
const communitiesByName = async(req, res)=>{
    try{
        const name = req.query.name;
        const communities = await communityService.getCommunitiesByName(name);
        return res.status(200).json({communities});
    }catch(err){
        return res.status(500).json({message:'Internal Server Error', error:err});
    }
}
const myCommunities = async(req, res)=>{
    try{
        const communities = await communityService.myCommunities(req.user.id);
        return res.status(200).json({communities});
    }catch(err){
        return res.status(500).json({message:'Error getting communities', error:err});
    }
}
const recommendations = async(req, res)=>{
    try{
        let userId = null;
        userId = await authService.getUserId(req,res);
        const communities = await communityService.recommendations(userId);
        return res.status(200).json({communities});
    }catch(err){
        return res.status(500).json({message:'Error getting communities', error:err});
    }
}
module.exports = {
    createCommunity,
    checkNameAvailability,
    communities,
    communityById,
    communitiesByName,
    myCommunities,
    recommendations
}