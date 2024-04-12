const express = require("express");
const { config } = require("dotenv");
const routes = require("./routes");
const app = express();

config();

app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}...`);
});
