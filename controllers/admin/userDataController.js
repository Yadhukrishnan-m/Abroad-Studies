const UserDetails = require('../../models/userDetails');
const moment = require('moment');
const ExcelJS = require('exceljs');

const loadUserData = async (req, res) => {
    try {
        let { startDate, endDate } = req.query;

        // Default to showing the latest 100 records if no filter is applied
        let query = {};

        if (startDate && endDate) {
            // Ensure the end date is inclusive by adding 1 day to the end date
            const endDateInclusive = new Date(endDate);
            endDateInclusive.setDate(endDateInclusive.getDate() + 1); // Increment by one day

            query.createdAt = {
                $gte: new Date(startDate),  // Greater than or equal to startDate
                $lt: endDateInclusive        // Less than the next day's start (inclusive endDate)
            };
        }
        
        // Fetch filtered or latest 100 users (latest 100 if no filter)
        const userDetails = await UserDetails.find(query).sort({ createdAt: -1 }).limit(100);
 
        res.render('userData', { userDetails, startDate, endDate, moment }); // Pass moment to the view
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred while loading user data');
    }
};
const downloadUserData = async (req, res) => {
    try {
        let { startDate, endDate } = req.body; // Use req.body instead of req.query for POST request
        let query = {};

        if (startDate && endDate) {
            // Ensure the end date is inclusive by adding 1 day to the end date
            const startDateObj = new Date(startDate); // Convert startDate to Date object
            const endDateObj = new Date(endDate); // Convert endDate to Date object

            // Increment the end date by 1 day to make it inclusive
            endDateObj.setDate(endDateObj.getDate() + 1); // Add 1 day to the end date to make it inclusive

            // Construct the query
            query.createdAt = {
                $gte: startDateObj,  // Greater than or equal to startDate
                $lt: endDateObj      // Less than the next day's start (inclusive endDate)
            };
        }

        // Fetch only the filtered users (not the whole data)
        const userDetails = await UserDetails.find(query).sort({ createdAt: -1 });

        // Generate Excel file
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('User Data');

        worksheet.columns = [
            { header: 'Name', key: 'name' },
            { header: 'Email', key: 'email' },
            { header: 'Phone', key: 'phone' },
            { header: 'City', key: 'city' },
            { header: 'Qualification', key: 'qualification' },
            { header: 'Registration Date', key: 'createdAt' },  // Registration Date
            { header: 'Time', key: 'time' }  // Time
        ];

        // Add filtered user data to the worksheet
        userDetails.forEach(user => {
            worksheet.addRow({
                name: user.name,
                email: user.email,
                phone: user.phone,
                city: user.city,
                qualification: user.qualification,
                // Only date (without time) in the 'createdAt' column
                createdAt: moment(user.createdAt).format('YYYY-MM-DD'),
                // Only time (in 12-hour format with AM/PM) in the 'time' column
                time: moment(user.createdAt).format('hh:mm A')
            });
        });

        // Set headers for Excel download
        res.setHeader('Content-Disposition', 'attachment; filename=user_data.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred while downloading user data');
    }
};


module.exports = {
    loadUserData,
    downloadUserData
};