const express = require("express");
const router = express.Router();
const {
  shortenUrl,
  redirect,
  getStats
} = require("../controllers/UrlController");

const Url = require("../models/Url"); // ✅ add this

// ✅ NEW: fetch all shortened URLs
router.get("/urls", async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/shorten", shortenUrl);
router.get("/stats/:code", getStats);
router.get("/:code", redirect); 

module.exports = router;
