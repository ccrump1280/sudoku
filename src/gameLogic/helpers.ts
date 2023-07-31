export function getBlockByRowAndColumn(row: number, col: number) {
    return Math.floor(row/3)*3 + Math.floor(col / 3);
}

export function getRowAndColumnByBlockAndIndex(block: number, index: number): [number, number] {
    const row = 3*Math.floor(block / 3) + Math.floor(index / 3);
    const col = 3*(block % 3) + (index % 3);
    return [row, col];
}