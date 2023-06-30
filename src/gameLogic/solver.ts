interface solution {
    board: number[][],
    isUnique: boolean
}
  
export default function solveSudoku(board: number[][]): solution {
    const boardDeepCopy = JSON.parse(JSON.stringify(board));
    let solutions = 0;
    let isUnique: boolean;
    let solvedBoard: number[][] = [];
    solveRecursion(boardDeepCopy, 0, 0);
    if (solutions == 1) {
        isUnique = true;
    }else {
        isUnique = false;
    }
    return {board: solvedBoard, isUnique: isUnique};

    function solveRecursion(board: number[][], row: number, column: number): boolean {
        if (row == 9){
            solutions++;
            solvedBoard = JSON.parse(JSON.stringify(boardDeepCopy));
            return true;
        }
        if (column == 9) {
            return solveRecursion(board, row+1, 0);
        }
        if (board[row][column] != 0){
            return solveRecursion(board, row, column+1);
        }
        for (let value=1; value <= 9; value++){
            if (isValidValue(board, row, column, value)){
                board[row][column] = value;
                if (solveRecursion(board, row, column+1)){
                    if (solutions == 1) {
                        board[row][column] = 0;
                    }else {
                        return false;
                    }
                }else {
                    board[row][column]= 0;
                }      
            }   
        }
        return false;
    }
};

function isValidValue(board: number[][], row: number, column: number, value: number) {
    
    var gridStart = [Math.floor(row/3)*3, Math.floor(column/3)*3];

    for (let i=0; i < 9; i++){
        var gridRow = gridStart[0] + Math.floor(i/3);
        var gridColumn = gridStart[1] + (i % 3);
        if (board[row][i] == value || board[i][column] == value || board[gridRow][gridColumn] == value){
            return false;
        }
    }
    return true;
}
