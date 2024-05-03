const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// mongoose.connect("mongodb://localhost:27017/users-register");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.db_URL);
  console.log("DB_connection_success") 
}
