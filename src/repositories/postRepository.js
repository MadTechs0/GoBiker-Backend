const Post = require('../models/post');
const Comments = require('../models/comments');


const createPost = async(postData) =>{
    const post = new Post(postData);
    const savedPost = await post.save();

    return (savedPost.id);
}
const communityPosts =  async(communityId)=>await Post.find({communityId});

const postDetails = async(id) =>{
    const post = await Post.findById(id);
    const comments = await Comments.find({postId:id});
    return res.status(200).json({post, comments});
}

module.exports = {
    createPost,
    communityPosts,
    postDetails
}