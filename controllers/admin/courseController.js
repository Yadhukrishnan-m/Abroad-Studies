

const multer = require('multer');
const path = require('path');
const fs = require('fs');  // Import the fs module

const Course = require('../../models/course');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/course')); // Save to /public/course folder
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now(); // Current timestamp
    const randomString = Math.floor(1000 + Math.random() * 9000); // Random 4-digit string
    const fileExtension = path.extname(file.originalname); // Get the file extension
    cb(null, `${timestamp}-${randomString}${fileExtension}`); // Combine timestamp, random string, and extension
  },
});

// File filter to accept images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Multer upload instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// Controller to handle course addition
const addCourse = async (req, res) => {
  try {
    // Handle file upload
    upload.single('courseImage')(req, res, async (err) => {
      if (err) {
        return res.status(400).send(`Error uploading image: ${err.message}`);
      }

      // Check if a file is uploaded
      if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }

      // Save the course data and image path to the database
      const course = new Course({
        course: req.body.courseName,
        description: req.body.courseDescription,
        image: `/course/${req.file.filename}`, // Image path to be saved
      });

      await course.save();
      console.log('Course added successfully.');
      res.redirect('/admin/course');
    });
  } catch (error) {
    console.log('Error in adding course: ' + error);
    res.status(500).send('An error occurred while adding the course.');
  }
};

// Controller to load all courses
const loadCourse = async (req, res) => {
  try {
    const courses = await Course.find(); 
    
    // Fetch all courses from the database
    res.render('course', { courses }); // Pass courses to the view
  } catch (error) {
    console.log('Error loading courses: ' + error);
    res.status(500).send('An error occurred while loading the courses.');
  }
};

const deleteCourse = async (req, res) => {
  try {
    console.log("yes got it ");
    
    const courseId = req.params.courseId; // Get course ID from URL parameter

    // Find the course by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send('Course not found');
    }

    // The image path stored in DB is relative to the 'public' folder
    const imagePath = path.join(__dirname, '../../public', course.image); // Get the absolute file path

    // Delete the course image from the public folder
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.log('Error deleting the image:', err);
        return res.status(500).send('Error deleting the image');
      }
    });

    // Delete the course document from the database
    await Course.findByIdAndDelete(courseId);

    console.log('Course deleted successfully');
    return res.redirect('/admin/course'); // Redirect to the courses page after deletion
  } catch (error) {
    console.log('Error in deleting course: ' + error);
    res.status(500).send('An error occurred while deleting the course');
  }
};


module.exports = {
  loadCourse,
  addCourse,
  deleteCourse
};
