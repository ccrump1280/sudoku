import Game from "../gameLogic/game";
import { getBlockByRowAndColumn } from "../gameLogic/helpers";

const predefinedSolution = [
    [3, 2, 6, 1, 7, 5, 4, 8, 9],
    [4, 5, 7, 8, 9, 6, 1, 2, 3],
    [9, 8, 1, 4, 2, 3, 7, 5, 6],
    [1, 3, 2, 5, 6, 4, 8, 9, 7],
    [5, 6, 4, 9, 8, 7, 2, 3, 1],
    [7, 9, 8, 2, 3, 1, 5, 6, 4],
    [2, 1, 5, 6, 4, 9, 3, 7, 8],
    [6, 4, 3, 7, 5, 8, 9, 1, 2],
    [8, 7, 9, 3, 1, 2, 6, 4, 5]

]
const predefinedMask = [
    [3, 0, 6, 0, 0, 5, 0, 0, 9],
    [0, 0, 7, 0, 9, 6, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 7, 5, 0],
    [1, 3, 0, 5, 0, 0, 0, 0, 0],
    [5, 0, 0, 9, 0, 0, 0, 0, 1],
    [0, 0, 8, 0, 0, 0, 0, 0, 0],
    [2, 1, 5, 0, 4, 0, 3, 7, 0],
    [6, 0, 0, 0, 5, 0, 0, 0, 2],
    [8, 0, 9, 3, 1, 2, 6, 0, 5]
]


test('Should be able to select cell and apply correct highlights to other cells', () => {
    const game  = new Game("beginner");
    const randomRow = Math.floor(Math.random() * 9);
    const randomCol = Math.floor(Math.random() * 9);
    const randomBlock = game.board[randomRow][randomCol].block

    game.selectCell(randomRow, randomCol);
    
    expect(game.board[randomRow][randomCol].isSelected).toBeTruthy;
    for (let row=0; row < 9; row++) {
        for (let col=0; col < 9; col++) {
            const block = getBlockByRowAndColumn(row, col);
            const cell = game.board[row][col];
            if (row == randomRow && col == randomCol) {
                expect(cell.highlightType).toBe("primary")
            }else if (game.board[randomRow][randomCol].value == game.board[row][col].value) {
                expect(cell.highlightType).toBe("secondary");
            }else if (row == randomRow || col == randomCol || block == randomBlock) {
                expect(cell.highlightType).toBe("tertiary");
            }else {
                expect(cell.highlightType).toBe("none");
            }
        }
    }
});

test('Should not be able to change value of fixed cell', () => {
    const game = new Game("medium", predefinedSolution, predefinedMask);

    game.updateCellValue(0, 0, 8);

    expect(game.board[0][0].value).toBe(3);
});

test('updateCellNotes on unfixed cell should add note not already present and remove note already present', () => {
    const game = new Game("medium", predefinedSolution, predefinedMask);

    game.updateCellNotes(0, 1, 5);
    expect(game.board[0][1].notes[0]).toBe(5);

    game.updateCellNotes(0, 1, 5);
    expect(game.board[0][1].notes.length).toBe(0);
});
