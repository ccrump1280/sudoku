import Cell from "./cell";
import boardGenerator from "./boardGenerator";
import boardMaskerByDifficulty from "./boardMasker";

type difficulty = ("beginner" | "easy" | "medium" | "hard" | "expert");

export default class Game {
    private undoStack: (()=>void)[];

    public difficulty: difficulty;
    public board: Cell[][];

    constructor(difficulty: difficulty, predefinedSolution: number[][] | undefined = undefined, predefinedMask: number[][] | undefined = undefined) {
        this.difficulty = difficulty;
        this.undoStack = [];

        let solvedBoard: number[][];
        predefinedSolution ? solvedBoard = predefinedSolution : solvedBoard = boardGenerator();
        let maskedBoard: number[][];
        predefinedMask ? maskedBoard = predefinedMask : maskedBoard = boardMaskerByDifficulty(solvedBoard, difficulty);
        
        this.board = Array(9).fill(undefined).map(() => Array(9).fill(undefined));
        for (let row=0; row < 9; row++) {
            for (let col=0; col < 9; col++) {
                this.board[row][col] = new Cell(row, col, maskedBoard[row][col], solvedBoard[row][col] == maskedBoard[row][col]);
            }
        }

    }

    public selectCell(selectedRow: number, selectedCol: number): void {
        const selectedCell = this.board[selectedRow][selectedCol];

        for (let row=0; row < 9; row++) {
            for (let col=0; col < 9; col++) {
                const currentCell = this.board[row][col];
                if (selectedRow == row && selectedCol == col) {
                    currentCell.isSelected = true;
                }else {
                    currentCell.isSelected = false;
                }

                if (selectedCell.value == currentCell.value) {
                    currentCell.setHighlightType("primary");
                }else if(row == selectedRow || col == selectedCol || currentCell.block == selectedCell.block) {
                    currentCell.setHighlightType("secondary");
                }else {
                    currentCell.setHighlightType("none");
                }
            }
        }
    }

    public updateCellValue(row: number, col: number, value: number): void {
        const cell = this.board[row][col];
        if (cell.isFixed) {
            return;
        }
        this.addUndo(row, col);
        cell.clearNotes();
        cell.value = value;
    }

    public updateCellNotes(row: number, col: number, value: number): void {
        const cell = this.board[row][col];
        if (cell.isFixed) {
            return;
        }
        this.addUndo(row, col);
        cell.updateNotes(value);
        cell.value = 0;
    }

    public eraseCell(row: number, col: number): void {
        const cell = this.board[row][col];
        if (cell.isFixed) {
            return;
        }
        this.addUndo(row, col);
        cell.value = 0;
        cell.clearNotes();
    }

    private addUndo(row: number, col: number): void {
        const cell = this.board[row][col];
        const notesCopy = [...cell.notes];
        const valueCopy = cell.value;
        this.undoStack.push(() => {
            cell.notes = notesCopy;
            cell.value = valueCopy;
            this.selectCell(row, col);
        });
    }

    public undoAction() {
        const action = this.undoStack.pop();
        action?.call(this);
    }

}