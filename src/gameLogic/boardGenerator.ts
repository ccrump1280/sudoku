export default function boardGenerator() {
    const board = [
        [3, 2, 6, 1, 7, 5, 4, 8, 9],
        [4, 5, 7, 8, 9, 6, 1, 2, 3],
        [9, 8, 1, 4, 2, 3, 7, 5, 6],
        [1, 3, 2, 5, 6, 4, 8, 9, 7],
        [5, 6, 4, 9, 8, 7, 2, 3, 1],
        [7, 9, 8, 2, 3, 1, 5, 6, 4],
        [2, 1, 5, 6, 4, 9, 3, 7, 8],
        [6, 4, 3, 7, 5, 8, 9, 1, 2],
        [8, 7, 9, 3, 1, 2, 6, 4, 5]
  
    ];
    return shuffleBoard(board);
}

function shuffleBoard(board: number[][]) {
    for (let row=0; row < 9; row++) {
        for (let col=0; col < 9; col++) {
            shuffleCell(board, row, col);
        }
    }
    return board;
}
  
//shuffles cell within same block and adjusts board to still be a valid solution with recursion
//when the recursion reaches the original number swapped that is termination case
function shuffleCell(board: number[][], row: number, col: number) {
    const originalNumber = board[row][col];
    const gridStart = [Math.floor(row/3)*3, Math.floor(col/3)*3];
    const randomNumber = Math.floor(Math.random()*9);
    const randomIndices = [gridStart[0] + Math.floor(randomNumber/3), gridStart[1] + (randomNumber % 3)];

    //if function randomly picked same cell no swap necessary
    if (randomIndices[0] == row && randomIndices[1] == col) {
        return;
    }

    const swapNumber = board[randomIndices[0]][randomIndices[1]];

    board[randomIndices[0]][randomIndices[1]] = originalNumber;
    board[row][col] = swapNumber;

    if (randomIndices[0] == row) {
        fixColumnsRecursion(swapNumber, row, col);
    }else if (randomIndices[1] == col) {
        fixRowsRecursion(swapNumber, row, col);
    }else {
        fixRowsRecursion(swapNumber, row, col);
        fixColumnsRecursion(swapNumber, row, col);
    }

    function fixRowsRecursion(currentNumber: number, row: number, col: number) {
        if (currentNumber == originalNumber) {
            return;
        }
        let nextColumn = 0;
        for (let i=0; i < 9; i++) {
            if (i != col && board[row][i] == currentNumber){
                nextColumn = i;
            }
        }
        let swapRow = 0;
        for (let i=0; i < 3; i++) {
            const currentRow = gridStart[0] + i;
            if (currentRow != row && !board[currentRow].includes(currentNumber)) {
                swapRow = currentRow;
            }
        }
        const swapNumber = board[swapRow][nextColumn];
        board[swapRow][nextColumn] = currentNumber;
        board[row][nextColumn] = swapNumber;
        fixRowsRecursion(swapNumber, row, nextColumn);
    }

    function fixColumnsRecursion(currentNumber: number, row: number, col: number){
        if (currentNumber == originalNumber) {
            return;
        }
        let nextRow = 0;
        for (let i=0; i < 9; i++) {
            if (i != row && board[i][col] == currentNumber) {
                nextRow = i;
            }
        }
        let swapColumn = 0;
        for (let i=0; i < 3; i++) {
            const currentColumn = gridStart[1] + i;
            if (currentColumn == col) {
                continue;
            }
            let containsCurrentNumber = false;
            for (let i=0; i < 9; i++) {
                if (board[i][currentColumn] == currentNumber) {
                    containsCurrentNumber = true;
                }
            }
            if (!containsCurrentNumber) {
                swapColumn = currentColumn;
            }
        }
        const swapNumber = board[nextRow][swapColumn];
        board[nextRow][swapColumn] = currentNumber;
        board[nextRow][col] = swapNumber;
        fixColumnsRecursion(swapNumber, nextRow, col);
    }

}

