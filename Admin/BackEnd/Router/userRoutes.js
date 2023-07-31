const express = require("express")
const userController = require("../controller/userController")
const {Signup} = require("../model/Schema")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const nodemailer = require("nodemailer")
const mail = require("../controller/mail")



const router = express.Router();
const storage = multer.diskStorage({
  destination: '../bookstore/public/userProfile',
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});
const storage1 = multer.diskStorage({
  destination: '../bookstore/public/userProfile',
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

const storage2 = multer.diskStorage({
  destination: '../Front-end/public/userProfile',
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});
const upload2 = multer({ storage: storage2 });

// Initialize multer upload middleware
const upload = multer({ storage: storage });
const upload1 = multer({ storage: storage1 });

router
.route('/userCart')
.post(userController.userCart)


router
  .route('/users')
  .get(userController.getAllUsers)
  .post(userController.createUser)

router
  .route("/users/login")
  .post(userController.loginUser)

router.route("/users/:id")
  .put(userController.updateUser)
  .get(userController.getUser)




//   .put("/users/:id/video", upload.single("video"), userController.updateUserVideo)
//   .put("/users/:id/pdf", upload.single("pdf"), userController.updateUserpdf)

router
  .route("/sendotp")
  .post(userController.sendOtp)
     
router
  .route("/submitotp")
//   .post(userController.submitOtp)


router.put("/user/:id",upload2.single("img"), userController.updateprofile)
     
module.exports = router;