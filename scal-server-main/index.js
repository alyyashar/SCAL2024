require('dotenv').config();
const fs = require('fs');
const PyShell = require('python-shell');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const formidable = require('formidable');
const serveStatic = require('serve-static');
const cors = require('cors');
const app = express();
const connection = require('./db');
const User = require('./model/auth.model');
const contractRoutes = require('./scmonitor/contractRoutes');  // Import the routes


// CORS Options
const allowedOrigins = [
  'http://localhost:3000',
  'https://3000-alyyashar-scal2024-zyixncvobqi.ws-us115.gitpod.io'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionSuccessStatus: 200
};

app.use(cors(corsOptions)); // Apply CORS options here

// Database connection
connection();

app.use('/api/scmonitor', contractRoutes);

// Middlewares
app.use(bodyParser.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

// Serve static files
app.use(serveStatic(path.join(__dirname, 'dist'))); // Serve static files from /dist

// Load all routes
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');

// Routes
app.get('/', (req, res) => res.json('SCAL Server is up and running'));
app.use('/api', authRouter); // Apply /api prefix to auth routes
app.use('/api', userRouter); // Apply /api prefix to user routes

// Fetch all users
app.get('/api/all-users', async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (err) {
    console.error('Failed to fetch users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Handle file input
app.post('/api/file-input', async (req, res) => {
  try {
    res.setTimeout(10 * 60 * 1000, function () {
      console.log('Request has timed out.');
      res.sendStatus(408);
    });

    const { tools, file } = req.body;

    fs.writeFileSync(path.join(__dirname, 'scal/toAnalyze/toAnalyze.sol'), file);
    console.log("File Written Successfully");

    const options = {
      args: ['--tool', ...tools, '--file', path.join(__dirname, 'scal/toAnalyze/toAnalyze.sol')]
    };

    let pyshell = new PyShell.PythonShell(path.join(__dirname, 'scal/scal.py'), options);

    pyshell.on('message', function (message) {
      console.log("Received", message);
    });

    pyshell.end(async (err) => {
      if (err) {
        console.error('Python script execution failed:', err);
        return res.status(500).json({ error: 'Python script execution failed' });
      }
      try {
        const results = fs.readFileSync(path.join(__dirname, 'scal/results.json'));
        res.send(results);
      } catch (readError) {
        console.error('Failed to read results file:', readError);
        res.status(500).json({ error: 'Failed to read results file' });
      }
    });
  } catch (err) {
    console.error('Something went wrong:', err);
    res.status(400).json({ error: 'Something went wrong!' });
  }
});

// Handle file import
app.post('/api/file-import', async (req, res) => {
  try {
    let tools;
    res.setTimeout(10 * 60 * 1000, function () {
      console.log('Request has timed out.');
      res.sendStatus(408);
    });

    const form = new formidable.IncomingForm();

    form.on('error', function (err) {
      console.error('File upload failed:', err);
      res.status(500).json({ error: 'File upload failed' });
    });

    form.parse(req);

    form.on('fileBegin', function (name, file) {
      file.path = path.join(__dirname, 'scal/toAnalyze/toAnalyze.sol');
    });

    form.on('field', function (name, value) {
      if (name === 'tools') {
        tools = value;
      }
    });

    form.on('file', async function (name, file) {
      console.log('Uploaded ' + file.name);
      const options = {
        args: ['--tool', ...tools.split(','), '--file', path.join(__dirname, 'scal/toAnalyze/toAnalyze.sol')]
      };

      let pyshell = new PyShell.PythonShell(path.join(__dirname, 'scal/scal.py'), options);

      pyshell.on('message', function (message) {
        console.log("Received", message);
      });

      pyshell.end(async (err) => {
        if (err) {
          console.error('Python script execution failed:', err);
          return res.status(500).json({ error: 'Python script execution failed' });
        }
        try {
          const results = fs.readFileSync(path.join(__dirname, 'scal/results.json'));
          res.send(results);
        } catch (readError) {
          console.error('Failed to read results file:', readError);
          res.status(500).json({ error: 'Failed to read results file' });
        }
      });
    });
  } catch (err) {
    console.error('Something went wrong:', err);
    res.status(400).json({ error: 'Something went wrong!' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`SCAL Server is running on localhost PORT: ${port}`));

module.exports = app;
