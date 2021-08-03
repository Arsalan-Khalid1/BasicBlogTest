const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const register = async (req, res, next) => {
  const { email, username, password, profilePic } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    res.status(500).json("sign up failed");
    return next();
  }

  if (existingUser) {
    res.status(422).json("User already exist");
    return next();
  }

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    res.status(500).json("could not create user please try again");
    return next();
  }

  const createdUser = new User({
    username,
    email,
    profilePic: profilePic,
    password: hashedPassword,
  });

  try {
    await createdUser.save();
  } catch (err) {
    res.status(500).json("sign up failed, please try again");
    return next();
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
      },
      "supersecret_private_tokengen_key",
      { expiresIn: "1h" }
    );
  } catch (err) {
    res.status(500).json("sign up failed please try again");
    return next();
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    res.status(500).json("Login failed please try again!");
    return next();
  }

  if (!existingUser) {
    res
      .status(404)
      .json("User doesn't exist please try again with correct credentials");
    return next();
  }

  let invalidPwd;

  try {
    invalidPwd = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    res.status(500).json("Login failed please try again!");
    return next();
  }

  if (!invalidPwd) {
    res
      .status(401)
      .json("invalid password please try again with valid password");
    return next();
  }

  let token;

  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      "supersecret_private_tokengen_key",
      { expiresIn: "1h" }
    );
  } catch (err) {
    res.status(500).json("Login failed please try again");
    return next();
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

module.exports = { register, login };
