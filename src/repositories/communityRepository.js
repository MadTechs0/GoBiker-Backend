const Community = require('../models/community');

const createCommunity = async(newCommunity) =>{
    const community = new Community(newCommunity);
    const savedCommunity = await community.save();
    return (savedCommunity.id);
}
const checkNameAvailability = async(name) =>{
    const community = await Community.findOne({name:name}).collation( { locale: 'en', strength: 2 } )
    if(community){
        return false;
    }else{
        return true;
    }
} 
const getCommunities = async() =>{
    try{
        const communities = await Community.find();
        return communities;
    }catch(err){
        return err;
    }
}
const getCommunityById = async(id) =>{
    try{
        const community = await Community.findById(id).lean();
        return community;
    }catch(err){
        return err;
    }
}
const getCommunitiesByName = async(name) =>{
    try{
        const communities = await Community.find({ name: {$regex: name, $options:'i'} }, '_id name description members');
        return communities;
    }catch(err){
        return err;
    }
}
const myCommunities = async(userId)=>{
    try{
        const communities = await Community.find({ownerId:userId}).lean();
        return communities;
    }catch(err){
        return err;
    }
}
const recommendations = async(userId)=>{
    try{
        if(userId){
            const communities = await Community.find({ ownerId: { $ne: userId } }, '_id name description members').lean();
            return communities;
        }else{
            const communities = await Community.find().lean();
            return communities;
        }
    }catch(err){
        return err;
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