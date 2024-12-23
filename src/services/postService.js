const postRepo = require('../repositories/postRepository');
const S3 = require('./s3Service');

const createPost = async(req, res) => {
    try{
        const {communityId, title, description} = req.body;
        const postId = await postRepo.createPost({createrId:req.user.id, communityId, title, description});
        if(!postId){
            return res.status(500).json({message:'Error uploading post'});
        }
        const preSignedUrl = await S3.getPreSignedUrl('posts', postId);

        return res.status(200).json(preSignedUrl);
        
    }catch(err){
        return res.status(500).json({message:'Internal server error', error:err});
    }
}

const communityPosts = async(communityId) => {
    return await postRepo.communityPosts(communityId);
}
module.exports = {
    createPost,
    communityPosts,
}