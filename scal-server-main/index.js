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

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200
};

// Database connection
connection();

// Middlewares
app.use(bodyParser.json());
app.use(serveStatic(__dirname + "/dist"));
app.use(cors(corsOptions)); // Apply CORS options here

// Load all routes
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');

// Routes
app.get('/', (req, res) => res.json('SCAL Server is up and running'));
app.use('/api', authRouter);
app.use('/api', userRouter);
app.get('/api/all-users', async (req, res) => {
  const allUsers = await User.find();
  res.json(allUsers);
});

app.post('/api/file-input', async (req, res) => {
  try {
    res.setTimeout(10 * 60 * 1000, function () {
      console.log('Request has timed out.');
      res.send(408);
    });

    const tools = req.body.tools;
    const contract = req.body.file;

    try {
      fs.writeFileSync(__dirname + '/scal/toAnalyze/toAnalyze.sol', contract);
      console.log("File Written Successfully");
    } catch (err) {
      console.error(err);
    }

    const options = {
      args: ['--tool', ...tools, '--file', __dirname + '/scal/toAnalyze/toAnalyze.sol']
    };

    let results = fs.readFileSync(__dirname + '/scal/results.json');

    let pyshell = new PyShell.PythonShell(__dirname + '/scal/scal.py', options);

    console.log("Received Request: ", options.args);

    pyshell.on('message', function (message) {
      console.log("Received", message);
    });

    pyshell.end(async (err, code, signal) => {
      if (err) throw err;
      let results = await fs.readFileSync(__dirname + '/scal/results.json');
      res.send(results);
    });
  } catch (err) {
    res.status(400).json({ error: 'Something went wrong!' });
    console.log(err);
  }
});

app.post('/api/file-import', async (req, res) => {
  try {
    let tools;
    res.setTimeout(10 * 60000 * 1000, function () {
      console.log('Request has timed out.');
      res.send(408);
    });

    const form = new formidable.IncomingForm();

    form.on('error', function (err) {
      console.log('An error has occurred: \n' + err);
    });

    form.parse(req);

    form.on('fileBegin', function (name, file) {
      file.path = __dirname + '/scal/toAnalyze/toAnalyze.sol';
    });

    form.on('field', function (name, value) {
      if (name === 'tools') {
        tools = value;
      }
    });

    form.on('file', async function (name, file) {
      console.log('Uploaded ' + file.name);
      const options = {
        args: ['--tool', ...tools.split(','), '--file', __dirname + '/scal/toAnalyze/toAnalyze.sol']
      };

      let results = fs.readFileSync(__dirname + '/scal/results.json');

      let pyshell = new PyShell.PythonShell(__dirname + '/scal/scal.py', options);

      console.log("Received Request: ", options.args);

      pyshell.on('message', function (message) {
        console.log("Received", message);
      });

      pyshell.end(async (err, code, signal) => {
        if (err) throw err;
        let results = await fs.readFileSync('scal/results.json');
        res.send(results);
      });
    });
  } catch (err) {
    res.status(400).json({ error: 'Something went wrong!' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`SCAL Server is running on localhost PORT: ${port}`));

module.exports = app;
