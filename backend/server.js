const express = require("express");
//const cors = require("cors");

const app = express();
const PORT = 8080;



// ✅ Parse JSON request bodies
app.use(express.json());


app.post("/api/coordinates", (req, res) => {
  console.log("Received coordinates:", req.body);
  res.json({ message: "Coordinates received!" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});


