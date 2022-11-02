// set express js
const express = require("express");
const authRoute = require("../routes/auth");

// initialize express and set port
const app = express();
const port = process.env.API_PORT;
app.listen(port, () => console.log(`API Server is listening on port ${port}!`));

app.use(authRoute);
// import env  - keep in mind to comment dev_api.sh scripts to prevent overwrite in docket images while debugging
require("dotenv").config();