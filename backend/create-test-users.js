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

async function createTestUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 12);
    await User.findOneAndUpdate(
      { email: 'admin@test.com' },
      {
        name: 'Admin User',
        email: 'admin@test.com',
        password: adminPassword,
        role: 'admin',
        status: 'active',
        servicePlan: 'Elite',
        quickBooksConnected: false
      },
      { upsert: true, new: true }
    );
    console.log('✓ Admin user created: admin@test.com / admin123');

    // Create regular user
    const userPassword = await bcrypt.hash('user123', 12);
    await User.findOneAndUpdate(
      { email: 'user@test.com' },
      {
        name: 'Test User',
        email: 'user@test.com',
        password: userPassword,
        role: 'user',
        status: 'active',
        servicePlan: 'Vitals',
        quickBooksConnected: false
      },
      { upsert: true, new: true }
    );
    console.log('✓ Regular user created: user@test.com / user123');

    await mongoose.disconnect();
    console.log('\nTest users created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createTestUsers();
