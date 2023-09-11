import User from "../schema/userSchema.js";

export const signup = async (req, res) => {
  const { email, password } = req.body;

  console.log("Received data:", req.body);

  if (!email || !password) {
    return res.status(400).send("Email and password are required.");
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const user = new User({ email, password });
    await user.save();

    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).send(error.message || "Server error");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).send("Invalid credentials");
    }

    res.status(200).send("Logged in successfully");
  } catch (error) {
    res.status(500).send("Server error");
  }
};
