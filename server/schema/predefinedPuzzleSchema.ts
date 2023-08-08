import mongoose from 'mongoose';

const PredefinedPuzzleSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // Include the _id field
  difficulty: String,
  solutionGrid: [[Number]], // 2D array representing the solution
  maskedGrid: [[Number]]    // 2D array representing the masked puzzle
});

const PredefinedPuzzle = mongoose.model('PredefinedPuzzle', PredefinedPuzzleSchema);

export default PredefinedPuzzle;
