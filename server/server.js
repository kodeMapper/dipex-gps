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
  console.log("Received:", req.body);
  latestLocation = req.body;
  res.json({ status: "success", data: latestLocation });
});

// Steps update endpoint
app.post('/api/update-steps', (req, res) => {
  const currentSteps = req.body.steps; // Absolute value
  console.log("Received steps:", currentSteps);
  
  // Store the latest step count (not cumulative)
  latestData.steps = currentSteps; 
  latestData.lastUpdated = new Date();

  res.json({ totalSteps: currentSteps });
});

app.get("/api/latest-location", (req, res) => {
  res.json(latestLocation);
});

app.get("/api/latest-steps", (req, res) => {
  res.json({ totalSteps: latestData.steps });  
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test endpoint: http://localhost:${PORT}/api/test`);
});
