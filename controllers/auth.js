const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("./../models/userModel");

exports.signUp = async (req, res) => {
  const { email, password } = { ...req.body };
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await User.create({
    email,
    password: hashedPassword,
  });
  res.status(201).json({
    status: "success",
    data: newUser,
  });
};

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = { ...req.body };

    const user = await User.findOne({ email });

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      //   res.status(400).json({
      //     status: "failure",
      //     message: "Invalid Password.",
      //   });
      //   return next();
      const error = new Error("Invalid Password");
      error.statusCode = 400;
      throw error;
    }

    const token = await jwt.sign({ id: user.id }, "somesupersecretkey", {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: "success",
      data: {
        token,
        id: user.id,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.protect = async (req, res, next) => {
  try {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      throw new Error("You are not logged in! Please log in to get access.");
    }

    // 2) Verification token
    const decodedToken = jwt.verify(token, "somesupersecretkey");
    // const decodedToken = await promisify(jwt.verify)(
    //   token,
    //   "somesupersecretkey"
    // );

    // 3) Check if user still exists
    const currentUser = await User.findById(decodedToken.id);
    if (!currentUser) {
      throw new Error("The user belonging to this token does no longer exist.");
    }

    // 4) setting user id
    req.userId = decodedToken.id;
    next();
  } catch (error) {
    next(error);
  }
};
