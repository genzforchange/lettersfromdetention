import express from "express";
import path from "path";
import { createServer } from "http";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import { parse } from "csv-parse/sync";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STATE_NAMES = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas",
  CA: "California", CO: "Colorado", CT: "Connecticut", DE: "Delaware",
  FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho",
  IL: "Illinois", IN: "Indiana", IA: "Iowa", KS: "Kansas",
  KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi",
  MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada",
  NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York",
  NC: "North Carolina", ND: "North Dakota", OH: "Ohio", OK: "Oklahoma",
  OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina",
  SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah",
  VT: "Vermont", VA: "Virginia", WA: "Washington", WV: "West Virginia",
  WI: "Wisconsin", WY: "Wyoming", DC: "District of Columbia"
};

function loadLetters() {
  const csvPath = path.join(__dirname, "public", "lfd.csv");
  const raw = readFileSync(csvPath, "utf-8");
  const records = parse(raw, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
    trim: true,
  });

  return records.map(function (row, index) {
    var images = [row.Image1].filter(Boolean);
    if (row.Image2) images.push(row.Image2);
    if (row.Image3) images.push(row.Image3);
    if (row.Image4) images.push(row.Image4);

    var stateRaw = (row.State || "").trim();
    var stateAbbr = stateRaw.toUpperCase();
    var stateName = STATE_NAMES[stateAbbr] || stateRaw;

    var descriptions = [];
    if (row.Desc1) descriptions.push(row.Desc1);
    if (row.Desc2) descriptions.push(row.Desc2);

    return {
      id: index + 1,
      firstName: row.FirstName || "",
      descriptions: descriptions,
      images: images,
      state: stateName,
      stateAbbr: stateAbbr,
      translation: row.EngTranslation || row.Translation || "",
    };
  });
}

const app = express();
const httpServer = createServer(app);

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/letters", function (req, res) {
  try {
    var letters = loadLetters();
    res.json(letters);
  } catch (err) {
    console.error("Error loading CSV:", err.message);
    res.status(500).json({ error: "Failed to load letter data" });
  }
});

app.get("/{*path}", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = parseInt(process.env.PORT || "5000", 10);
httpServer.listen({ port, host: "0.0.0.0", reusePort: true }, function () {
  var time = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(time + " [server] serving on port " + port);
});