const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const connectDB = require('./config/database');
const app = require('./app');
const { initComplianceScheduler } = require('./utils/complianceService');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      initComplianceScheduler();
    });
  } catch (error) {
    console.error(error.message || error);
    process.exit(1);
  }
};

startServer();
