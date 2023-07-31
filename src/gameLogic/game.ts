import Cell from "./cell";
import boardGenerator from "./boardGenerator";
import boardMaskerByDifficulty from "./boardMasker";
import { getBlockByRowAndColumn } from "./helpers";

type difficulty = ("beginner" | "easy" | "medium" | "hard" | "expert");

export default class Game {
    public difficulty: difficulty;
    public board: Cell[][];
    public selectedCell: Cell | undefined;
    public isNotes: boolean;
    public isSolved: boolean;

    constructor(difficulty: difficulty, predefinedSolution: number[][] | undefined = undefined, predefinedMask: number[][] | undefined = undefined) {
        this.difficulty = difficulty;
        this.isNotes = false;
        this.isSolved = false;

        let solvedBoard: number[][];
        predefinedSolution ? solvedBoard = predefinedSolution : solvedBoard = boardGenerator();
        let maskedBoard: number[][];
        predefinedMask ? maskedBoard = predefinedMask : maskedBoard = boardMaskerByDifficulty(solvedBoard, difficulty);
        
        this.board = Array(9).fill(undefined).map(() => Array(9).fill(undefined));
        for (let row=0; row < 9; row++) {
            for (let col=0; col < 9; col++) {
                this.board[row][col] = new Cell(row, col, solvedBoard[row][col], solvedBoard[row][col] == maskedBoard[row][col]);
            }
        }

    }

    public selectCell(selectedRow: number, selectedCol: number): this {
        const selectedCell = this.board[selectedRow][selectedCol];
        this.selectedCell = selectedCell;
        for (let row=0; row < 9; row++) {
            for (let col=0; col < 9; col++) {
                const currentCell = this.board[row][col];
                if (selectedRow == row && selectedCol == col) {
                    currentCell.isSelected = true;
                }else {
                    currentCell.isSelected = false;
                }
                if (selectedRow == row && selectedCol == col) {
                    currentCell.setHighlightType("primary")
                }
                else if (selectedCell.value != 0 && selectedCell.value == currentCell.value) {
                    currentCell.setHighlightType("secondary");
                }else if(row == selectedRow || col == selectedCol || currentCell.block == selectedCell.block) {
                    currentCell.setHighlightType("tertiary");
                }else {
                    currentCell.setHighlightType("none");
                }
            }
        }
        return this;
    }

    public updateCellValue(row: number, col: number, value: number): this {
        const cell = this.board[row][col];
        if (cell.isFixed) {
            return this;
        }
        this.removeConflictingNotes(row, col, value);
        cell.value = value;
        this.checkIsSolved();
        return this;
    }

    private removeConflictingNotes(selectedRow: number, selectedCol: number, value: number) {
        for (let row=0; row < 9; row++) {
            for (let col=0; col < 9; col++) {
                const block = getBlockByRowAndColumn(selectedRow, selectedCol);
                const cell = this.board[row][col];
                if ((row == selectedRow || col == selectedCol || cell.block == block) && cell.notes.includes(value)) {
                    this.updateCellNotes(row, col, value);
                }
            }
        }
    }
    private checkIsSolved() {
        for (let row=0; row < 9; row++) {
            for (let col=0; col < 9; col++) {
                if (this.board[row][col].value != this.board[row][col].solutionValue) {
                    return this.isSolved = false;
                }
            }
        }
        this.isSolved = true;
    }

    public updateCellNotes(row: number, col: number, value: number): this {
        const cell = this.board[row][col];
        if (cell.isFixed) {
            return this;
        }
        cell.updateNotes(value);
        cell.value = 0;
        return this;
    }

    public eraseCell(row: number, col: number): this {
        const cell = this.board[row][col];
        if (cell.isFixed) {
            return this;
        }
        cell.value = 0;
        cell.clearNotes();
        return this;
    }
    public toggleNotes(): this {
        this.isNotes = !this.isNotes;
        return this;
    }

}