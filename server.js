const express = require('express');
const db = require('./db');
const hbs = require('express-handlebars');
const sections = require('express-handlebars-sections');

// Initialize the server
const server = express();

// IMPORTANT: Configure Handlebars properly
server.engine('hbs', hbs.engine({
    extname: '.hbs',
    defaultLayout: false  // Since your login.hbs is a complete HTML file
}));

// Configuring the view engine (template engine)
server.set('view engine', 'hbs'); 
server.set('views', 'views');

// Body parser middleware MUST come before routes
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Import routes after middleware is set up
const route = require('./route')(server); // Pass server to route

// Listen to port 3000
server.listen(3000, () => {
    console.log("Your server is listening on port 3000");
});