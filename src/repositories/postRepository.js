const Post = require('../models/post');
const Comment = require('../models/comments');


const createPost = async(postData) =>{
    const post = new Post(postData);
    const savedPost = await post.save();

    return (savedPost.id);
}
const communityPosts =  async(communityId)=>{
    try{
        const posts = await Post.find({communityId:communityId}, '_id title communityId likes comments creatorId')
        .populate({
            path: 'communityId',
            model: 'Community',
            select: 'name',
        })
        .populate({
            path: 'creatorId',
            model: 'User',
            select: 'name profileUrl'
        });
        return posts;
    }catch(err){
        console.log(err)
        return err;
    }
}

const postDetails = async(id) =>{
    try{
        const post = await Post.findById(id, '_id title description communityId likes comments creatorId')
        .populate({
            path: 'communityId',
            model: 'Community',
            select: 'name',
        })
        .populate({
            path: 'creatorId',
            model: 'User',
            select: 'name profileUrl'
        })
        .populate({
            path: '_id',
            model: 'Comment',
            select: 'Comment userId',
            populate:{
                path: 'userId',
                model: 'User',
                select: 'name profileUrl'
            }
        });
        return post;
    }catch(err){
        console.log(err);
        return err;        
    }
}

const addComment = async(comment) =>{
    try{
        const Comment = new Comment(comment);
        await Comment.save();
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    createPost,
    communityPosts,
    postDetails,
    addComment
}