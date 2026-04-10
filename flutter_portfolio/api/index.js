const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Resume JSON
app.get('/api/resume', (req, res) => {
  const filePath = path.join(__dirname, '../frontend/data/resume.json');
  res.sendFile(filePath);
});

// Resume PDF download
app.get('/api/resume/download', (req, res) => {
  const filePath = path.join(__dirname, '../backend/data/resume.pdf');
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) return res.status(404).json({ error: 'Resume PDF not found' });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Suchandra_Mondal_Resume.pdf"');
    fs.createReadStream(filePath).pipe(res);
  });
});

module.exports = app;
