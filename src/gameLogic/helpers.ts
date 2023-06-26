export function getBlockByRowAndColumn(row: number, col: number) {
    return Math.floor(row/3)*3 + Math.floor(col / 3);
}