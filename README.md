# ShuffleSudoku!

## Purpose

This app is a new spin on the game of Sudoku. Whenever you get stuck, you can shuffle the board to create a fresh perspective of the exact same puzzle (in terms of logic needed to solve). The idea is similar to playing a word game where you need to find as many words from a set of letters. When you get stuck, you shuffle the letters to see them from a new angle. 

## Major Functions

### Create Random Puzzles

The obvious main function of the app is to create random sudoku puzzles with difficulties of beginner, easy, medium, hard, and expert. The difficulties get progressively harder with expert consisting of puzzles only with numbers that could not be removed due to making the solution non-unique (i.e. multiple ways to solve the same board). 

### Game Controls

The user solves the puzzle using either onClick or keyboard events. When active, the notes feature transcribes notes in a 3x3 grid in the cell as numbers are entered. The erase function clears a cell completely and the undo function utilizes a momento stack to undo last action that altered the puzzle. The puzzle can also be paused which stops the timer and blurs the board.


| Keyboard Input | Action |
|----------------|--------|
| Arrow Keys     | selectCell |
| Shift          | toggleNotes|
| NumPad         | updateValue/Notes|
| p              | toggleTimer (pause/play)|
|backspace       | eraseCell|
| delete         | undoAction|

### Shuffler 

The unique concept of this app is the ability to shuffle the board but maintain the same puzzle logic. This function works by utilizing the mathematical concepts of combinations and permutations. The same combination (i.e. puzzle logic) can have multiple permutations (different ways of arranging puzzle). To explain how the permutations are created, first examine the top row of 3x3 grids and the bottom row of 3x3 grids. Now imagine that they just swapped places and you will see that the puzzle has not really changed but the perspective has slightly shifted. With this logic it is easy to see how this applies to the 3x3 columns as well. Now examine the first row of the puzzle and imagine swapping it with either the second or third row. You will again see that the puzzle is still essentially the same since the row was switched within the same 3x3 grid. This also applies to columns. Now imagine all instances of the value 1 is replaced by 2 and all instances of 2 are replaced by 1. This is also easy to see how this makes the same puzzle. Although these might seem like minor changes on thier own, combining them all randomly allows for thousands of permutations that all have a new perspective. All values and notes input by the user are also included in the permutation. 

### Finished Game Banner

When the user finishes the game a congratulations message appears with a confetti animation in the background. The message includes the difficulty of the puzzle and the elapsed time as well as a custom quote based on that time. For example, the message could read "Congratulations! You solved the beginner puzzle in 55:55. That must be a new record! Maybe just not the record you wanted. Was a nap involved?"

### Future Functions

The ultimate goal is for this project to become a full stack project that allows the user to sign in and track progress on puzzles. Currently, I have configured this project to connect to a MongoDB Atlas database which I have seeded with 30 predefined puzzles of each difficulty. I have yet to implement any other functionality of the backend. 

## Dependencies

`"dependencies": {
    "@chakra-ui/react": "^2.7.1",
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "framer-motion": "^10.12.17",
    "lodash.clonedeep": "^4.5.0",
    "mongoose": "^7.4.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^4.10.1",
    "react-particles": "^2.11.0",
    "react-spinners": "^0.13.8",
    "react-sweet-state": "^2.6.5",
    "tsparticles": "^2.11.1",
    "tsparticles-preset-confetti": "^2.11.0"
  }`
### react-sweet-state 
This package combines React/Redux functionality with React hook syntax that makes for easy state management of the application.

### Chakra UI
Chakra is a library of easy to use UI components that allow for easy responsive styling.

### tsparticles tsparticles-preset-conffetti 
The ts-particles engine and a preset package for the conffetti animation that plays in the finished game banner.

### lodash.clonedeep
Needed to make deep copies of game state.

### mongoose / express / cors
Backend set up.

## Dev Dependencies
`"devDependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^14.0.0",
    "@testing-library/user-event": "^14.4.3",
    "@types/express": "^4.17.17",
    "@types/react": "^18.0.37",
    "@types/react-dom": "^18.0.11",
    "@typescript-eslint/eslint-plugin": "^5.59.0",
    "@typescript-eslint/parser": "^5.59.0",
    "@vitejs/plugin-react-swc": "^3.0.0",
    "dotenv": "^16.3.1",
    "eslint": "^8.38.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.3.4",
    "jsdom": "^22.1.0",
    "ts-node": "^10.9.1",
    "typescript": "^5.0.2",
    "vite": "^4.3.9",
    "vitest": "^0.32.2"
  }`

### Vite
This project was templated by Vite.

### Vitest / jest
Vitest allows for jest testing within the project. 

## Build / Deploy 
This project is built with the Vite build command and deployed statically to github pages. When the project is ready for backend implementation, the plan is to deploy the project on Heroku.

