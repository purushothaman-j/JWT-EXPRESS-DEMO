const User = require("./../models/userModel");

exports.getSignedUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.userId });

    res.status(200).json({
      status: "success",
      message: "You are allowed to access this page.",
      data: { userId: user.id },
    });
  } catch (error) {
    next(error);
  }
};
