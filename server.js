const express = require("express");
const cors = require("cors");

const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

// use all routes
app.use("/", routes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});

