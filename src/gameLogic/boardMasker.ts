import solveSudoku from "./solver"

export default function boardMaskerByDifficulty(board: number[][], difficulty: string) {
    const boardDeepCopy = JSON.parse(JSON.stringify(board));
    let allIndices = []
    for (let i=0; i < 9; i++) {
        for (let j=0; j < 9; j++) {
            allIndices.push([i, j]);
        }
    }
    let randomIndices = shuffle(allIndices);
    if (difficulty == "beginner") {
        for (let i=0; i < 42; i++) {
            randomIndices.pop();
        }
    }else if (difficulty == "easy") {
        for (let i=0; i < 37; i++) {
            randomIndices.pop();
        }
    }else if (difficulty == "medium") {
        for (let i=0; i < 32; i++) {
            randomIndices.pop();
        }
    }else if (difficulty == "hard") {
        for (let i=0; i < 27; i++) {
            randomIndices.pop();
        }
    }
    for (let randomIndex of randomIndices) {
        let randomCellValue = boardDeepCopy[randomIndex[0]][randomIndex[1]];
        boardDeepCopy[randomIndex[0]][randomIndex[1]] = 0;
        let solution = solveSudoku(boardDeepCopy);
        if (!solution.isUnique) {
            boardDeepCopy[randomIndex[0]][randomIndex[1]] = randomCellValue;
        }
    }
    return boardDeepCopy;
}
  
function shuffle(array: number [][]) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a random element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}
  