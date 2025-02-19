import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/note-app';

export default async function mongoConnect() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');

    mongoose.connection.on('disconnected', () => {
      console.error('MongoDB connection disconnected');
      process.exit(1);
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}