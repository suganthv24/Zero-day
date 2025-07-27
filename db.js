const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect('mongodb+srv://shivasarva32:lpjjlCeHY71UpgH1@zeroday-cluster.jrbqrnh.mongodb.net/?retryWrites=true&w=majority&appName=ZeroDay-Cluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// --- User Login Schema ---
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

const UserLogin = mongoose.model('UserLogin', UserSchema);

// --- Lost & Found Schema ---
const LostFoundSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Lost', 'Found'],
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  contactName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

// Export the model
 


const LostFoundItem = mongoose.model('LostFoundItem', LostFoundSchema);

// --- Announcement Schema ---
const AnnouncementSchema = new mongoose.Schema({
  title: {
    type: String, 
    required: true
  }, 
  content: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'], // ✅ Fixed 'heigh' to 'high'
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});


// Update the updatedAt field on save


const Announcement = mongoose.model('Announcement', AnnouncementSchema);

// --- Export Models ---
module.exports = {
  UserLogin,
  LostFoundItem,
  Announcement
};