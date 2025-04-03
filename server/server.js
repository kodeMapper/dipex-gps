const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://your-vercel-app-name.vercel.app'],
  credentials: true
}));

app.options('*', cors());
app.use(express.json());

// Store latest data
let latestData = {
  location: { lat: 0, lng: 0 },
  steps: 0,
  lastUpdated: null
};

let latestLocation = { lat: 0, lng: 0 };

let totalSteps = 0; // Keep track of total steps

app.post("/update-location", (req, res) => {
  console.log("Received:", req.body);
  latestLocation = req.body;
  res.json({ status: "success", data: latestLocation });
});

app.post("/update-steps", (req, res) => {
  const currentSteps = req.body.steps; // Absolute value
  console.log("Received steps:", currentSteps);
  
  // Store the latest step count (not cumulative)
  latestData.steps = currentSteps; 
  latestData.lastUpdated = new Date();

  res.json({ totalSteps: currentSteps });
});

app.get("/latest-location", (req, res) => {
  res.json(latestLocation);
});

app.get("/latest-steps", (req, res) => {
  res.json({ totalSteps: latestData.steps });  
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));








// const express = require("express");
// const cors = require("cors");
// const app = express();

// app.use(cors());

// // Handle preflight requests
// app.options('*', cors());

// app.use(express.json());

// let latestLocation = { lat: 0, lng: 0 };

// app.post("/update-location", (req, res) => {
//   console.log("Received:", req.body);
//   latestLocation = req.body;
//   res.json({ status: "success", data: latestLocation });
// });

// app.get("/latest-location", (req, res) => {
//   res.json(latestLocation);
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));