import Cell from '../gameLogic/cell';

test('constructing new cell should return cell with matching properties', () => {
    //arrange && act
    const fixedCell = new Cell(1, 2, 8, true);
    const unfixedCell = new Cell(4, 7, 4, false);

    //assert
    expect(fixedCell.row).toBe(1);
    expect(fixedCell.col).toBe(2);
    expect(fixedCell.solutionValue).toBe(8);
    expect(fixedCell.value).toBe(8);
    expect(fixedCell.isFixed).toBeTruthy;

    expect(unfixedCell.row).toBe(4);
    expect(unfixedCell.col).toBe(7);
    expect(unfixedCell.solutionValue).toBe(4);
    expect(unfixedCell.value).toBe(0);
    expect(unfixedCell.isFixed).toBeFalsy;

});

test('updating unfixed cell notes with value not already present should add the value to notes', () => {
    // arrange
    const cell = randomCell(false);
    cell.notes = [1, 2, 3, 4];
    //act
    cell.updateNotes(5);
    //assert
    expect(cell.notes).toContain(5);
});

test('updating unfixed cell notes with value already present should remove the value from notes', () => {
    //arrange
    const cell = randomCell(false);
    cell.notes = [1, 2, 3, 4];
    expect(cell.notes).toContain(3);
    //act
    cell.updateNotes(3);
    //assert
    expect(cell.notes.includes(3)).toBe(false);
});

test('updating fixed cell notes should do nothing', () => {
    //arrange
    const cell = randomCell(true);
    //act
    cell.updateNotes(Math.floor(Math.random() * 9 + 1));
    //assert
    expect(cell.notes.length).toBe(0);
});

test('clear notes should result in notes being empty', () => {
    //arrange
    const cell = randomCell(false);
    cell.notes = [4, 6, 7, 8];
    //act
    cell.clearNotes();
    //assert
    expect(cell.notes.length).toBe(0);
});

test('set highlight should correctly set the highlight type of cell', () => {
    //arrange 
    const cell = randomCell(false);

    cell.setHighlightType("primary");
    expect(cell.highlightType).toBe("primary");

    cell.setHighlightType("secondary");
    expect(cell.highlightType).toBe("secondary");

    cell.setHighlightType("none");
    expect(cell.highlightType).toBe("none");
});

function randomCell(isFixed: boolean) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    const solution = Math.floor(Math.random() * 9 + 1);
    return new Cell(row, col, solution, isFixed);
}


  