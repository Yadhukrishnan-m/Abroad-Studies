const path = require('path');
const fs = require('fs');
const Banner = require('../../models/banner'); 

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..','..', 'public', 'banner'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Max file size 10 MB
    fileFilter: (req, file, cb) => {
        // Accept only image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed.'));
        }
    }
}).single('bannerUpload'); 


const loadBanner=async(req,res)=>{
    try {
        const banner = await Banner.findOne();  

        res.render('banner', { banner });
    } catch (error) {
        console.log('error in load banner '+ error);
        res.status(500).send('Error loading the page');
    }
}

const addBanner = async (req, res) => {
    try {
        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).send('Please upload an image');
        }

        // Find the existing banner and delete it if present
        const existingBanner = await Banner.findOne();
        if (existingBanner) {
            // Delete the old banner image from the filesystem
            const oldBannerPath = path.join(__dirname, '..','..', 'public', existingBanner.banner);
            if (fs.existsSync(oldBannerPath)) {
                fs.unlinkSync(oldBannerPath); // Remove old file
            }
            // Remove the old banner from the database
            await Banner.deleteOne({ _id: existingBanner._id });
        }

        // Save the new banner path in the database (relative to 'public')
        const newBanner = new Banner({
            banner: `banner/${req.file.filename}` // Save the relative path
        });

        await newBanner.save(); // Save to DB
        res.redirect('/admin/banner'); // Redirect after successful upload
    } catch (error) {
        console.log('Error in addBanner: ', error);
        res.status(500).send('Error uploading the banner');
    }
};
module.exports={
    loadBanner,
    addBanner,
    upload
}