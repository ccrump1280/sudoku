// server.js
import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import router from './routes/sudoku.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 5000; // Choose any available port number

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MongoURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@sudokudb.irbxzy6.mongodb.net/`;
mongoose.connect(MongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Connected to MongoDB successfully');
});

// Register routes
app.use('/api/sudoku', router);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
