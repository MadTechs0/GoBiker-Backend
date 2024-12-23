const express = require('express');
const auth = require('../controllers/authController');
const profile = require('../controllers/profileController');
const post = require('../controllers/postController');
const {authenticate} = require('../middlewares/auth');
const router = express.Router();

router.post('/register', auth.register);
router.post('/login', auth.login);

router.get('/getProfileDetails', authenticate, profile.getProfileDetails);

router.post('/createPost', authenticate, post.createPost);
router.get('/communityPosts', post.communityPosts);
module.exports = router;