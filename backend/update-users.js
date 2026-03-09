require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  status: String,
  servicePlan: String,
  quickBooksConnected: Boolean,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function updateExistingUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get all users
    const users = await User.find({});
    console.log(`Found ${users.length} users in database\n`);

    for (const user of users) {
      console.log(`\nUser: ${user.email}`);
      console.log(`  Current role: ${user.role || 'user'}`);
      console.log(`  Current plan: ${user.servicePlan || 'none'}`);
      console.log(`  Current status: ${user.status || 'lead'}`);

      // Update user with plan if they don't have one
      const updates = {};
      
      if (!user.servicePlan) {
        updates.servicePlan = 'Vitals';
        console.log(`  ✓ Added plan: Vitals`);
      }
      
      if (!user.status || user.status === 'lead') {
        updates.status = 'active';
        console.log(`  ✓ Updated status: active`);
      }

      if (Object.keys(updates).length > 0) {
        await User.findByIdAndUpdate(user._id, updates);
        console.log(`  ✓ User updated successfully`);
      } else {
        console.log(`  → No updates needed`);
      }
    }

    await mongoose.disconnect();
    console.log('\n\nAll users updated! You can now login with your existing credentials.');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

updateExistingUsers();
