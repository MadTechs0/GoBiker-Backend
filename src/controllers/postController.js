const postService = require('../services/postService');

const createPost = async(req, res)=>{
    return await postService.createPost(req,res);
}
const communityPosts = async(req,res) => {
    try{
        const posts = await postService.communityPosts(req.query.communityId);
        if(!posts){
            return res.status(404).json({message:"Error getting posts"});
        }
        return res.status(200).json({posts});
    }catch(err){
        return res.status(500).json({message:'Internal server error', error:error});
    }
}
const postDetails = async(req, res) => {
    try{
        const post = await postService.postDetails(req.query.id);
        if(!post){
            return res.status(404).json({message:"Error getting post"});
        }
        return res.status(200).json({post});
    }catch(err){
        return res.status(500).json({message:'Internal server error', error:error});
    }
}
const addComment = async(req, res) => {
    try{
        const {postId, comment} = req.body;
        const result = await postService.addComment({userId: req.user.id, postId, comment});
        if(result){
            return res.status(200).json('comment added');
        }
        return res.status(500).json('Error posting comment');
    }catch(err){
        return res.status(500).json({message:'Internal server error', error:error});
    }
}
module.exports = {
    createPost,
    communityPosts,
    postDetails,
    addComment
}