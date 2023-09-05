import mongoose from "mongoose";

const Connection = async (username = "uahtsham27", password = "docs1234") => {
  const URL = `mongodb+srv://${username}:${password}@cluster0.rct7kme.mongodb.net/`;
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting with the database ", error);
  }
};

export default Connection;
