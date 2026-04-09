const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Serve resume data
app.get('/api/resume', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'resume.json'));
});

// Serve resume PDF for download
app.get('/api/resume/download', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'resume.pdf');
  res.download(filePath, 'Sanjaykumar_Resume.pdf', (err) => {
    if (err) res.status(404).json({ error: 'Resume PDF not found. Please add resume.pdf to backend/data/' });
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
