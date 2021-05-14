const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer")
const postsController = require('../controllers/posts');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/', ensureAuth, postsController.getPosts);

router.get('/user/:userId', postsController.getUserFeed);
router.get('/:postId', postsController.getSinglePost);

router.post('/createPost', upload.single("file"), postsController.createPost);

router.put('/like', postsController.likePost);

router.delete('/deletePost', postsController.deletePost);

module.exports = router;
