const express = require("express");
const { spawn } = require("child_process");
const router = express.Router();

router.get("/search", (req, res) => {
  const location = req.query.query;

  const pythonProcess = spawn("python3", [
    "backend/scraper/accommodation_scraper.py",
    location,
  ]);

  let dataToSend = "";
  pythonProcess.stdout.on("data", (data) => {
    dataToSend += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    if (code !== 0) {
      console.error(`Python script exited with code ${code}`);
      res.status(500).json({ error: "Failed to fetch accommodation data" });
    } else {
      try {
        const results = JSON.parse(dataToSend);
        res.json({ results });
      } catch (e) {
        console.error("Error parsing JSON:", e);
        res.status(500).json({ error: "Error parsing JSON" });
      }
    }
  });
});

module.exports = router;
