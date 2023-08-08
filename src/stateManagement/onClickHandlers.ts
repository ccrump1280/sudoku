import { defaultRegistry } from "react-sweet-state";
import { Store } from "./gameState";

const gameStore = defaultRegistry.getStore(Store);

export const handleValueClick = (value: number) => {
    const state = gameStore.storeState.getState();
    const actions = gameStore.actions;
    const selectedCell = state.game.selectedCell;
    if (selectedCell == undefined || state.isPaused) {
        return;
    }
    if (state.game.isNotes) {
        actions.updateCellNotes(selectedCell.row, selectedCell.col, value);
    }else {
        actions.updateCellValue(selectedCell.row, selectedCell.col, value);
    }
}

export const handleEraseClick = () => {
    const state = gameStore.storeState.getState();
    const actions = gameStore.actions;
    const selectedCell = state.game.selectedCell;
    if (selectedCell != undefined && !state.isPaused) {
        actions.eraseCell(selectedCell.row, selectedCell.col);
    }
}

export const handleNotesClick = () => {
    const actions = gameStore.actions;
    actions.toggleNotes();
}

export const handleUndoClick = () => {
    const state = gameStore.storeState.getState();
    const actions = gameStore.actions;
    if (!state.isPaused) {
        actions.undoAction();
    }
}