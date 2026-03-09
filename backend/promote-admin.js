require('dotenv').config();

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: String,
    role: String,
    status: String,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function promoteAdmin() {
  const email = process.argv[2];

  if (!email) {
    console.error('Usage: node promote-admin.js admin@example.com');
    process.exit(1);
  }

  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not configured.');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      {
        $set: {
          role: 'admin',
          status: 'active',
        },
      },
      { new: true }
    );

    if (!user) {
      console.error(`User not found for email: ${email}`);
      process.exit(1);
    }

    console.log(`Promoted ${user.email} to admin.`);
    process.exit(0);
  } catch (error) {
    console.error('Error promoting admin:', error.message);
    process.exit(1);
  }
}

promoteAdmin();
