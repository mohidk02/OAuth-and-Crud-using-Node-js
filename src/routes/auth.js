const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const userController = require("../controllers/userController");
const postsController = require("../controllers/postsController");

// express is no more bundled with body parser so we need to include body-parser
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

// Register a new User
router.post("/register", jsonParser, userController.register);

// Login
router.post("/login", jsonParser, userController.login);

//Posts Routes
router.get("/posts", jsonParser, auth, postsController.getAllPosts);
module.exports = router;
