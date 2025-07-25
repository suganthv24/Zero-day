const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://shivasarva32:lpjjlCeHY71UpgH1@zeroday-cluster.jrbqrnh.mongodb.net/?retryWrites=true&w=majority&appName=ZeroDay-Cluster', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Define the schema
const userLoginSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create a model
const UserLogin = mongoose.model('UserLogin', userLoginSchema);

// Export the model
module.exports = UserLogin;
