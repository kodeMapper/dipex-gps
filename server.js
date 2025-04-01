const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

let latestLocation = { lat: 0, lng: 0 };

app.post("/update-location", (req, res) => {
  console.log("Received:", req.body);
  latestLocation = req.body;
  res.json({ status: "success", data: latestLocation });
});

app.get("/latest-location", (req, res) => {
  res.json(latestLocation);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));