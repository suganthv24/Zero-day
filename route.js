// Import your MongoDB model at the top
const UserLogin = require('./db'); // This connects to your 'userlogins' collection

module.exports = (server) => {
    // GET route - just shows the login page
    server.get('/', (req, res) => {
        res.render('login');
    });
    
    // POST route - handles form submission and saves to database
    server.post('/', async (req, res) => {
        console.log('POST /login route hit!'); // Check if route is reached
        console.log('Request body:', req.body); // Check form data
        
        try {
            // Get form data from request body
            const { user, password } = req.body;
            
            // Debug: Check individual values
            console.log('User:', user);
            console.log('Password:', password);
            
            // Create new document in 'userlogins' collection
            const newUser = new UserLogin({
                user: user,
                password: password
            });
            
            // Save to MongoDB
            await newUser.save();
            
            // Redirect to dashboard or show success
            res.render('login', { success: 'Login successful!' });
            
        } catch (error) {
            console.error('Error saving user:', error);
            res.render('login', { error: 'Login failed. Please try again.' });
        }
    }
);
 server.get('/home',async(req,res)=>{
    res.render('home');
 })
 server.get('/admin/complaints',async(req,res)=>{
    res.render('compliant');
 })
    return server;
};