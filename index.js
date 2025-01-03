// index.js
//const server = require('./server');

import server from './server.js';

// Set the port the app will listen on
const PORT = process.env.PORT || 5000;

// Start the server
server.listen(PORT, () => {
  console.log("=============================================================");
  console.log(`| Test Init Massage on http://localhost:${PORT}/api/v1/message |`);
  console.log(`| Server is running on http://localhost:${PORT}                |`);
  console.log("=============================================================");
});