const post = require('../models/post');
const user = require('../models/user');
const postRepo = require('../repositories/postRepository');
const S3 = require('./s3Service');

const createPost = async(req, res) => {
    try{
        const post = req.body.post;
        const postId = await postRepo.createPost(post);
        if(!postId){
            return res.status(500).json({message:'Error uploading post'});
        }
        const preSignedUrl = await S3.getPreSignedUrl('posts', postId, 'put');

        return res.status(200).json(preSignedUrl);
        
    }catch(err){
        return res.status(500).json({message:'Internal server error', error:err});
    }
}

const communityPosts = async(communityId) => {
    return await postRepo.communityPosts(communityId);
}

const postDetails = async(postId) =>{
    return await postRepo.postDetails(postId);
}

const addComment = async(comment)=>{
    return await post(comment);
}
module.exports = {
    createPost,
    communityPosts,
    postDetails,
    addComment
}