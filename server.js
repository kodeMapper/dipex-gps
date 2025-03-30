const express = require("express");
const cors = require("cors");
const app = express();

// Add these lines ↓
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors());

let latestLocation = { lat: 0, lng: 0 };

app.post("/update-location", (req, res) => {
  console.log("Received body:", req.body); // Debug log
  latestLocation = req.body;
  res.send("Location updated");
});

app.get("/latest-location", (req, res) => {
  res.json(latestLocation);
});


app.listen(3000, () => console.log("Backend running on http://localhost:3000"));