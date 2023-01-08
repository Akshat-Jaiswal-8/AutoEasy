import mongoose from "mongoose";

const makeConnection = async (username, password, uri, port) => {
  const mongoURL = `mongodb://${username}:${password}@${uri}:${port}/?authSource=admin`;
  try {
    await mongoose.connect(mongoURL);
    console.log("Connected to the database successfully");
  } catch (error) {
    console.log(err, mongoURL);
    setTimeout(() => makeConnection(username, password, uri, port), 5000);
  }
};

export default makeConnection;
