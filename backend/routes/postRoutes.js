const express = require('express');
const postController = require('../controllers/PostController');

const router = express.Router();

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getOnePost);

router.post('/', postController.createPost);

router.patch('/:id', postController.updatePost);

router.delete('/:id', postController.deletePost);

module.exports = router;
