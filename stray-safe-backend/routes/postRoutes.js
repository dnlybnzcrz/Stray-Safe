const express = require('express');
const router = express.Router();
const controller = require('../controllers/postController');

router.post('/create', controller.createPost);
router.get('/get', controller.getPosts);

module.exports = router;