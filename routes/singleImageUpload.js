const express = require('express');
const singleImageUploadRouter = express.Router();
const upload = require('../utils/multer');
const { singleImageUpload } = require('../controllers/singleImageUpload');

singleImageUploadRouter.route('/uploadPetImage').post(upload.single('image') ,singleImageUpload);

module.exports = singleImageUploadRouter;