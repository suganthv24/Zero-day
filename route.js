// Import your MongoDB models
const { UserLogin, LostFoundItem, Announcement } = require('./db');

module.exports = (server) => {

    // GET: Show login page
    server.get('/', (req, res) => {
        res.render('login');
    });

    // POST: Handle login form
    server.post('/', async (req, res) => {
        console.log('POST /login route hit!');
        console.log('Request body:', req.body);

        try {
            const { user, password } = req.body;

            const newUser = new UserLogin({ user, password });
            await newUser.save();

            res.render('login', { success: 'Login successful!' });
        } catch (error) {
            console.error('Error saving user:', error);
            res.render('login', { error: 'Login failed. Please try again.' });
        }
    });

    // GET: Render other pages
    server.get('/home', (req, res) => {
        res.render('home');
    });

    server.get('/admin/complaints', (req, res) => {
        res.render('compliant');
    });

    server.get('/admin/lost-found', (req, res) => {
        res.render('lost-found');
    });

    // ✅ FIXED: POST route to save Lost & Found data
    server.post('/admin/lost-found', async (req, res) => {
        const {
            type,
            itemName,
            description,
            location,
            contactName,
            phoneNumber,
            date
        } = req.body;

        try {
            const newItem = new LostFoundItem({
                type,
                itemName,
                description,
                location,
                contactName,
                phoneNumber,
                date
            });

            await newItem.save();

            // Redirect or render success message
            res.render('lost-found', { success: 'Item created successfully!' });
        } catch (error) {
            console.error('Error saving item:', error);
            res.render('lost-found', { error: 'Failed to save item.' });
        }
    });

    server.get('/admin/announcements', (req, res) => {
        res.render('announcement');
    });
    server.post('/admin/announcements', async (req, res) => {
    const { title, content, priority } = req.body;
    
    try {
        const newAnnouncement = new Announcement({
            title,
            content,
            priority
        });
        
        await newAnnouncement.save(); // ✅ Added missing parentheses
        
        // ✅ Added response with success message
        res.render('announcement', { success: 'Announcement created successfully!' });
        
    } catch (error) {
        console.error('Error saving announcement:', error);
        // ✅ Added error handling
        res.render('announcement', { error: 'Failed to save announcement.' });
    }
});
    return server;
};
