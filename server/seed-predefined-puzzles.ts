import mongoose from 'mongoose';
import PredefinedPuzzle from './schema/predefinedPuzzleSchema.ts';
import boardGenerator from '../src/gameLogic/boardGenerator.ts';
import boardMaskerByDifficulty from '../src/gameLogic/boardMasker.ts';

// Connect to your MongoDB Atlas cluster
const MongoURI = `mongodb+srv://<username>:<password>@sudokudb.irbxzy6.mongodb.net/`;
mongoose.connect(MongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
} as mongoose.ConnectOptions);

// Define 30 predefined puzzles for each difficulty with IDs
const predefinedPuzzles: any = [];

const difficulties = ['beginner', 'easy', 'medium', 'hard', 'expert'];

for (let i=0; i < 30; i++) {
    for (let difficulty of difficulties) {
        const solution = boardGenerator();
        const mask = boardMaskerByDifficulty(solution, difficulty);
        predefinedPuzzles.push({
            _id: new mongoose.Types.ObjectId(),
            difficulty: difficulty,
            solutionGrid: solution,
            maskedGrid: mask
        });
    }
}

// Insert predefined puzzles into the database
PredefinedPuzzle.insertMany(predefinedPuzzles)
  .then(() => {
    console.log('Predefined puzzles seeded successfully');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error seeding predefined puzzles:', err);
    mongoose.disconnect();
  });
