const router = require('express').Router();
const upload = require('../middleware/multer');

const profileController = require('../controllers/profile');
const postController = require('../controllers/posts');

router.get('/:id', profileController.getProfile);

router.post('/posts/updatePost/:postId', upload.single('image'), postController.updatePost);

router.post('/posts/createPost', upload.single("file"), postController.createPost);

router.delete('/posts/deletePost',  postController.deletePost);

module.exports = router;
