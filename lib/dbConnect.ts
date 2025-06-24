import mongoose from "mongoose";

type ConnectionType = {
  isConnected: boolean;
};

const connection: ConnectionType = {
  isConnected: false,
};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  if (mongoose.connections[0].readyState) {
    connection.isConnected = true;
    return;
  }

  await mongoose.connect(process.env.MONGO_URI!);
  connection.isConnected = true;
}

export default dbConnect;
