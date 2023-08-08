import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { handleValueClick } from './onClickHandlers';
import { defaultRegistry } from 'react-sweet-state';
import { Store } from './gameState';

type GenericObject = {[key: string]: true | false}

const gameStore = defaultRegistry.getStore(Store);

export const useKeyPress = (func: (event: KeyboardEvent)=>void, target = window) => {
  // persistent "store" to track what keys are being pressed
  const [pressed, setPressed] = useState<GenericObject>({});

  // whenever a keydown event is fired ontarget element
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // if key isn't already pressed, run func
      if (!pressed[event.key])
        func(event);

      // add key to store
      setPressed({ ...pressed, [event.key]: true });
    },
    [func, pressed]
  );

  // whenever a keyup event is fired on the window element
  const onKeyUp = useCallback((event: KeyboardEvent) => {
    // remove key from store
    const { [event.key]: id, ...rest } = pressed;
    setPressed(rest);
  }, [pressed]);

  useEffect(() => {
    // add listeners when component mounts/changes
    target.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // cleanup/remove listeners when component unmounts/changes
    return () => {
      target.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [target, onKeyDown, onKeyUp]);
};

export const keydownHandler = (event: KeyboardEvent) => {
  const state = gameStore.storeState.getState();
  const actions = gameStore.actions;
  const selectedCell = state.game.selectedCell;
  if (state.isPaused && event.key != 'p') {
      return;
  }
  switch (event.key) {
      case 'Shift':
        actions.toggleNotes();
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (selectedCell) {
            if (selectedCell.row == 0) {
                actions.selectCell(8, selectedCell.col);
            }else {
                actions.selectCell(selectedCell.row-1, selectedCell.col);
            }
        }else {
          actions.selectCell(0, 0);
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        selectedCell ? actions.selectCell((selectedCell.row + 1) % 9, selectedCell.col): actions.selectCell(0, 0);
        break;
      case 'ArrowLeft':
        if (selectedCell) {
            if (selectedCell.col == 0) {
                actions.selectCell(selectedCell.row, 8);
            }else {
                actions.selectCell(selectedCell.row, selectedCell.col-1);
            }
        }else {
          actions.selectCell(0, 0);
        }
        break;
      case 'ArrowRight':
        selectedCell ? actions.selectCell(selectedCell.row, (selectedCell.col+1) % 9): actions.selectCell(0, 0);
        break;
      case 'Backspace':
        selectedCell ? actions.eraseCell(selectedCell.row, selectedCell.col): null;
        break;
      case 'Delete':
        actions.undoAction();
        break;
      case 'p':
        actions.toggleTimer();
  }
  if (/^[1-9]$/.test(event.key)) {
      handleValueClick(Number(event.key));
  }
}