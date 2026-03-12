require('dotenv').config();

const connectDB = require('./config/database');
const app = require('./app');
const { initComplianceScheduler } = require('./utils/complianceService');

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  initComplianceScheduler();
});
