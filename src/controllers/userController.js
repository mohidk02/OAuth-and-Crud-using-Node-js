const bcrypt = require("bcrypt");
const { users } = require("../models/users");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!(name && email && password)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await users.findOne({
      where: {
        login: email,
      },
    });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = {
      name: name,
      login: email,
      pass: encryptedPassword,
    };

    await users.create(user);

    // Create token
    const token = jwt.sign({ userid: user.id, email }, process.env.API_TOKEN, {
      expiresIn: "2h",
    });
    //save user token
    res.setHeader("Set-Cookie", token);

    // return new user
    res.json(user).status(201);
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await users.findOne({
      where: {
        login: email,
      },
    });
    if (user && (await bcrypt.compare(password, user.pass))) {
      // Create token
      const token = jwt.sign(
        { user_id: user.id, email },
        process.env.API_TOKEN,
        {
          expiresIn: "2h",
        }
      );

      //save user token
      res.setHeader("Set-Cookie", ["jwt=" + token]);

      // user
      res.json(user).status(200);
    } else res.json("Invalid Credentials").status(400);
  } catch (err) {
    console.log(err);
  }
};
