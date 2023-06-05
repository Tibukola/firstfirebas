const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth");
const {upload} = require("../helpers/index");

/* GET home page. */
router.post('/signup', authController.signup);
router.post('/upload', upload.single("image"), authController.upload_file);

module.exports = router;