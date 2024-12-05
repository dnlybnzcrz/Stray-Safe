const express = require('express')
const multer = require('multer');
const controller = require('../controllers/dataController');
const router = express.Router()
const upload = multer({
  limits: { fileSize: 12 * 1024 * 1024 }
});

// router.post('/upload/image', controller.login);
router.post('/upload/image', upload.single('image'), controller.uploadImage);
router.post('/get/image', controller.getImage);

module.exports = router;