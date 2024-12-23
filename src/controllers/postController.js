const postService = require('../services/postService');

const createPost = async(req, res)=>{
    return await postService.createPost(req,res);
}
const communityPosts = async(req,res) => {
    try{
        const posts = await postService.communityPosts(req.communityId);
        if(!posts){
            return res.status(404).json({message:"Error getting posts"});
        }
        return res.status(200).json(posts);
    }catch(err){
        return res.status(500).json({message:'Internal server error', error:error});
    }
}
module.exports = {
    createPost,
    communityPosts
}