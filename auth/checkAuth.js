import User from "../schema/userSchema.js";

export const checkAuth = async (req, res, next) => {
  const { email } = req.headers;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(403).send("Not authenticated");
  }

  next();
};
