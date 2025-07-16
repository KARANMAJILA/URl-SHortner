const Url = require("../models/Url");
const { nanoid } = require("nanoid");
const { BASE_URL } = process.env;

exports.shortenUrl = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  const shortCode = nanoid(6);
  const shortUrl = `${BASE_URL}/${shortCode}`;

  const newUrl = new Url({ originalUrl: url, shortCode, shortUrl });
  await newUrl.save();

  res.json(newUrl);
};

exports.redirect = async (req, res) => {
  const { code } = req.params;

  const urlDoc = await Url.findOne({ shortCode: code });
  if (!urlDoc) return res.status(404).send("Short URL not found");

  urlDoc.clicks += 1;
  urlDoc.lastClicked = new Date();
  await urlDoc.save();

  res.redirect(urlDoc.originalUrl);
};

exports.getStats = async (req, res) => {
  const { code } = req.params;
  const urlDoc = await Url.findOne({ shortCode: code });

  if (!urlDoc) return res.status(404).json({ error: "Not found" });

  res.json(urlDoc);
};
