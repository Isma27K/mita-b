// =================================== DEPENDENCY =====================================
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import authenticateToken from './middleware/jwtAuth.js';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

//==================================== ROUTES =========================================
//const test = require('./routes/test/test');
import login from './routes/auth/auth.js';

//============================= File Uploads middleware ========================================

const app = express();

// Set 1MB limits for body parser
app.use(bodyParser.json({limit: '25mb'}));
app.use(bodyParser.urlencoded({limit: '25mb', extended: true}));

// Middleware to handle CORS
app.use(cors());

// Parse JSON bodies for all routes
app.use(express.json());

// Parse URL-encoded bodies for all routes
app.use(express.urlencoded({ extended: true }));

// Get __dirname equivalent in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//================================== Serve File Uploads ========================================

// Function to ensure upload directory exists
function ensureUploadDirExists() {
  const uploadDir = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('Created uploads directory');
  }
}

ensureUploadDirExists();

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// =================================== WHERE API ROUTES START =====================================================

app.get('/', (req, res) => {
  res.jsonp({message: "Hello, from izz"});
});

//app.use("/test", test);
app.use("/api/v1", login);


// =================================== 404 Not Found Handler ========================================
app.use((req, res) => {
  res.status(404).json({ message: 'Route Not Found' });
});

export default app;