import { getBlockByRowAndColumn } from "./helpers";

export default class Cell {

    public value: number;
    public row: number;
    public col: number;
    public block: number;
    public solutionValue: number;
    public notes: number[];
    public highlightType: ("none" | "primary" | "secondary");
    public isFixed: boolean;
    public isSelected: boolean;

    constructor(row: number, col: number, solutionValue: number, isFixed: boolean) {
        this.row = row;
        this.col = col;
        this.block = getBlockByRowAndColumn(row, col);
        isFixed ? this.value = solutionValue : this.value = 0;
        this.solutionValue = solutionValue;
        this.notes = [];
        this.highlightType = "none";
        this.isFixed = isFixed;
        this.isSelected = false;
    }
    public updateNotes(note: number) {
        if (!this.isFixed) {
            const noteIndex = this.notes.indexOf(note);
            noteIndex == -1 ? this.notes.push(note) : this.notes.splice(noteIndex, 1);
        }
    }

    public clearNotes() {
        this.notes = [];
    }

    public setHighlightType(type: ("none" | "primary" | "secondary")) {
        this.highlightType = type;
    }
}
