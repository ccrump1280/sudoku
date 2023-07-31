import Cell from './cell'
import { getBlockByRowAndColumn } from './helpers';

export default boardShuffler;

function boardShuffler(board: Cell[][]) {
    //this function permutates the board creating a new perspective without changing the logic of the solution
    swapRows(board);
    swapColumns(board);
    swapBlockRows(board);
    swapBlockColumns(board);
    swapValues(board);
    cleanupCellProperties(board);
    return board;
}

function swapRows(board: Cell[][]) {
    for (let row=0; row < 9; row++) {
        //pick random row within same block to swap with
        const randomRow = 3*Math.floor(row/3) + Math.floor(Math.random()*3);
        if (randomRow == row) {
            continue;
        }
        const swapRow = Object.assign(Object.create(Object.getPrototypeOf(board[randomRow])), board[randomRow]);
        board[randomRow] = board[row];
        board[row] = swapRow;
    }
}

function swapColumns(board: Cell[][]) {
    for (let col=0; col < 9; col++) {
        const randomCol = 3*Math.floor(col/3) + Math.floor(Math.random()*3);
        if (randomCol == col) {
            continue;
        }
        for (let row=0; row < 9; row++) {
            const swapCell = Object.assign(Object.create(Object.getPrototypeOf(board[row][randomCol])), board[row][randomCol]);
            board[row][randomCol] = board[row][col];
            board[row][col] = swapCell;
        }
    }
}

function swapBlockRows(board: Cell[][]) {
    for (let blockRow=0; blockRow < 3; blockRow++) {
        const randomBlockRow = Math.floor(Math.random()*3);
        if (randomBlockRow == blockRow) {
            continue;
        }
        for (let rowIndex=0; rowIndex < 3; rowIndex++) {
            const row = blockRow*3 + rowIndex;
            const swapRow = randomBlockRow*3 + rowIndex;
            const rowCopy = Object.assign(Object.create(Object.getPrototypeOf(board[swapRow])), board[swapRow]);
            board[swapRow] = board[row];
            board[row] = rowCopy;
        }
    }
}

function swapBlockColumns(board: Cell[][]) {
    for (let blockCol=0; blockCol < 3; blockCol++) {
        const randomBlockCol = Math.floor(Math.random()*3);
        if (randomBlockCol == blockCol) {
            continue;
        }
        for (let colIndex=0; colIndex < 3; colIndex++) {
            const col = blockCol*3 + colIndex;
            const swapCol = randomBlockCol*3 + colIndex;
            for (let row=0; row < 9; row++) {
                const swapCell = Object.assign(Object.create(Object.getPrototypeOf(board[row][swapCol])), board[row][swapCol]);
                board[row][swapCol] = board[row][col]
                board[row][col] = swapCell;
            }
        }
    }
}

function swapValues(board: Cell[][]) {
    // swaps all instances of value and randomValue
    for (let value=1; value < 10; value++) {
        const randomValue = 1 + Math.floor(Math.random()*9);
        if (value == randomValue) {
            continue;
        }
        for (let row=0; row < 9; row++) {
            for (let col=0; col < 9; col++) {
                const cell = board[row][col];
                if (cell.solutionValue == value) {
                    cell.solutionValue = randomValue;
                }else if (cell.solutionValue == randomValue) {
                    cell.solutionValue = value;
                }
                if (cell.value == value) {
                    cell.value = randomValue;
                }else if (cell.value == randomValue) {
                    cell.value = value;
                }
                if (cell.notes.includes(value)) {
                    cell.notes.splice(cell.notes.indexOf(value), 1, randomValue);
                }
                if (cell.notes.includes(randomValue)) {
                    cell.notes.splice(cell.notes.indexOf(randomValue), 1, value);
                }
            }
        }
    }
}

function cleanupCellProperties(board: Cell[][]) {
    for (let row=0; row < 9; row++) {
        for (let col=0; col < 9; col++) {
            const cell = board[row][col];
            cell.row = row;
            cell.col = col;
            cell.block = getBlockByRowAndColumn(row, col);
            cell.highlightType = 'none';
            cell.isSelected = false;
        }
    }
}