const isLogin = async (req, res, next) => { 
    try {
        // Check if admin session exists
        if (!req.session.admin_id) {
            return res.redirect('/admin/');
        }
        // Proceed to the next middleware/controller
        next();
    } catch (error) {
        console.log("Error in isLogin middleware: ", error.message);
        res.status(500).send("Internal Server Error"); // Send error message to client
    }
}

const isLogout = async (req, res, next) => { 
    try {
        // If session exists, redirect to dashboard
        if (req.session.admin_id) {
            return res.redirect('/admin/dashboard');
        }
        // Proceed to the next middleware/controller
        next();
    } catch (error) {
        console.log("Error in isLogout middleware: ", error.message);
        res.status(500).send("Internal Server Error"); // Send error message to client
    }
}

module.exports = {
    isLogin,
    isLogout
}
