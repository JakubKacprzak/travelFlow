const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const offersRoutes = require("./routes/offersRoutes");
const usersRoutes = require("./routes/usersRoutes");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static("public"));

app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

app.use("/api/offers", offersRoutes);
app.use("/api/users", usersRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
