const express = require("express");
const cors = require("cors");
const app = express();

// Enable CORS - allow all origins for testing
app.use(cors());

app.use(express.json());

// Store the latest data
let latestData = {
  location: { lat: 0, lng: 0 },
  steps: 0
};

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: "Backend is working!" });
});

// Location update endpoint
app.post('/api/update-location', (req, res) => {
  console.log("Received location:", req.body);
  latestData.location = req.body;
  res.json({ status: "success", received: req.body });
});

// Steps update endpoint
app.post('/api/update-steps', (req, res) => {
  console.log("Received steps:", req.body);
  latestData.steps = req.body.steps;
  res.json({ status: "success", received: req.body.steps });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test endpoint: http://localhost:${PORT}/api/test`);
});