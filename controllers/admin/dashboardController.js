const { startOfDay, endOfDay, startOfMonth, endOfMonth, startOfYear, endOfYear, eachDayOfInterval, eachMonthOfInterval } = require('date-fns');
const UserDetails = require('../../models/userDetails');

const loadDashboard = async (req, res) => {
    try {
        const startOfToday = startOfDay(new Date());
        const endOfToday = endOfDay(new Date());

        const todaysCount = await UserDetails.countDocuments({
            createdAt: { $gte: startOfToday, $lt: endOfToday }
        });

        const count = await UserDetails.countDocuments();
        res.render('dashboard', { count, todaysCount });
    } catch (error) {
        console.log('Error loading dashboard:', error);
    }
};

// Helper function to get count by date range
const chart = async (req, res) => {
    try {
        const { type } = req.query;
        let labels = [];
        let counts = [];

         // Debugging line

        if (type === 'today') {
            const startOfToday = startOfDay(new Date());
            const endOfToday = endOfDay(new Date());
            const count = await UserDetails.countDocuments({
                createdAt: { $gte: startOfToday, $lt: endOfToday }
            });
            res.json({ labels: ['Today'], counts: [count] });
        }

        else if (type === 'month') {
            const startOfThisMonth = startOfMonth(new Date());
            const endOfThisMonth = endOfMonth(new Date());
            const days = eachDayOfInterval({ start: startOfThisMonth, end: endOfThisMonth });

            for (let day of days) {
                const startOfDayForMonth = startOfDay(day);
                const endOfDayForMonth = endOfDay(day);
                const dailyCount = await UserDetails.countDocuments({
                    createdAt: { $gte: startOfDayForMonth, $lt: endOfDayForMonth }
                });
                labels.push(day.getDate());
                counts.push(dailyCount);
            }

            res.json({ labels, counts });
        }

        else if (type === 'year') {
            const startOfThisYear = startOfYear(new Date());
            const endOfThisYear = endOfYear(new Date());
            const monthsOfYear = eachMonthOfInterval({ start: startOfThisYear, end: endOfThisYear });

            for (let month of monthsOfYear) {
                const startOfMonthForYear = startOfMonth(month);
                const endOfMonthForYear = endOfMonth(month);
                const monthlyCount = await UserDetails.countDocuments({
                    createdAt: { $gte: startOfMonthForYear, $lt: endOfMonthForYear }
                });
                labels.push(month.toLocaleString('default', { month: 'long' }));
                counts.push(monthlyCount);
            }

            res.json({ labels, counts });
        }

    } catch (error) {
        console.log('Error fetching chart data:', error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    loadDashboard,
    chart
};
