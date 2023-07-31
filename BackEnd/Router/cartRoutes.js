const express = require("express")

const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const nodemailer = require("nodemailer")
const {Signup,Products,Addcart,Blog} = require("../model/Schema")
const productController = require("../controller/productController")


const router = express.Router();
const cartController = require('../controller/cartController')

const customStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destination1 = '../Front-end/public/blogs'; // First destination
    const destination2 = '../../BSAlatest19-main/public/blogs';     // Second destination

    // Ensure both destination directories exist
    fs.mkdirSync(destination1, { recursive: true });
    fs.mkdirSync(destination2, { recursive: true });

    cb(null, destination1); // Set the temporary destination to the first one
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  },
});

const uploadMiddleware = multer({ storage: customStorage });

// API endpoint for creating a product with dynamic storage based on 'type' query parameter
router.post('/blog', uploadMiddleware.single('img'), async (req, res, next) => {
  // Move the uploaded file to the second destination
  const sourcePath = req.file.path;
  const destinationPath2WithFile = path.join(__dirname, '../../BSAlatest19-main/public/blogs', req.file.filename);

  // Create the destination directory if it doesn't exist
  const destinationDir = path.dirname(destinationPath2WithFile);
  fs.mkdirSync(destinationDir, { recursive: true });

  const readStream = fs.createReadStream(sourcePath);
  const writeStream = fs.createWriteStream(destinationPath2WithFile);

  readStream.on('error', (err) => {
    console.error('Error reading the source file:', err);
    res.status(500).json({ error: 'Error reading the source file' });
  });

  writeStream.on('error', (err) => {
    console.error('Error writing the file to the second destination:', err);
    res.status(500).json({ error: 'Error writing the file to the second destination' });
  });

  writeStream.on('finish', async () => {
    // Call the controller function to handle the product creation
    try {
      const { title } = req.body;

      // Create a new product with the user ID and the uploaded filename
      const newProduct = new Blog({
        title,
        img: req.file.filename,
      });

      // Save the product to the database
      await newProduct.save();

      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  readStream.pipe(writeStream);
});




router.get("/blog",(req,res)=>{
  Blog.find().then((result)=>{
    res.json(result)
})
    
})





router
  .route('/cart')

// router.delete('/cart/:id/', cartController.delcart) //getting user deleting product  cart


module.exports = router;