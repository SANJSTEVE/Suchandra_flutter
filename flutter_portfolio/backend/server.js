const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Serve resume JSON
app.get('/api/resume', (req, res) => {
  const filePath = path.join(__dirname, '../frontend/data/resume.json');
  res.sendFile(filePath);
});

// Download resume PDF
app.get('/api/resume/download', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'resume.pdf');
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) return res.status(404).json({ error: 'Resume PDF not found' });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Suchandra_Mondal_Resume.pdf"');
    fs.createReadStream(filePath).pipe(res);
  });
});

// Serve React build in production
const buildPath = path.join(__dirname, '../frontend/build');
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
