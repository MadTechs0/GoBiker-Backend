const express = require('express');
const auth = require('../controllers/authController');
const profile = require('../controllers/profileController');
const post = require('../controllers/postController');
const community = require('../controllers/communityController');
const {authenticate} = require('../middlewares/auth');
const { recommendations } = require('../repositories/communityRepository');
const router = express.Router();

router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/checkUsername', auth.checkUsernameAvailability);

router.get('/getProfileDetails', authenticate, profile.getProfileDetails);

router.post('/createPost', authenticate, post.createPost);
router.get('/communityPosts', post.communityPosts);
router.get('/posts', post.postDetails);
router.get('/comment', authenticate, post.addComment);

router.post('/createCommunity', authenticate, community.createCommunity);
router.get('/checkCommunityName', authenticate, community.checkNameAvailability);
router.get('/communities', community.communities);
router.get('/community', community.communityById);
router.get('/searchCommunity', community.communitiesByName);
router.get('/myCommunites', authenticate, community.myCommunities);
router.get('/recommendations', community.recommendations);   
module.exports = router;