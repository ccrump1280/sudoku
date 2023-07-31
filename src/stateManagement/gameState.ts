import {createStore, createHook } from 'react-sweet-state';
import Game from '../gameLogic/game'
import boardShuffler from '../gameLogic/shuffler';
import _ from 'lodash'

interface State {
    game: Game,
    isLoading: boolean,
    isPaused: boolean,
    timeElapsed: number,
    undoStack: Game[],
    finishedGameMessage: string | undefined
}

const initialState: State = {
    game: new Game('easy'),
    isLoading: false,
    isPaused: false,
    timeElapsed: 0,
    undoStack: [],
    finishedGameMessage: undefined
}
const Store = createStore({
    // value of the store on initialisation
    initialState: initialState,
    // actions that trigger store mutation
    actions: {
        newGame:
            (difficulty: ('beginner' | 'easy' | 'medium' | 'hard' | 'expert')) =>
            ({setState}) => {
                setState({
                    isLoading: true,
                    isPaused: false,
                    undoStack: []
                });
                setTimeout(() => {
                    const game = new Game(difficulty);
                    setState({
                        game: game,
                        isLoading: false,
                        timeElapsed: 0
                    });
                }, 1200);
            },
        incrementTimer:
            () => 
            ({setState, getState}) => {
                setState({
                    timeElapsed: getState().timeElapsed + 1
                })
            },
        toggleTimer: 
            () => 
            ({setState, getState}) => {
                setState({
                    isPaused: !getState().isPaused
                });
            },
        selectCell: 
            (row: number, col: number) =>
            ({ setState, getState }) => {
                // mutate state synchronously
                setState({
                    game: _.cloneDeep(getState().game.selectCell(row, col))
                });
            },
        updateCellValue: 
            (row: number, col: number, value: number) =>
            ({setState, getState}) => {
                setState({
                    undoStack: _.cloneDeep(getState().undoStack.concat(getState().game))
                });
                setState({
                    game: _.cloneDeep(getState().game.updateCellValue(row, col, value))
                });
                if (getState().game.isSolved) {
                    setState({
                        isPaused: true
                    })
                }
            },
        updateCellNotes: 
            (row: number, col: number, value: number) =>
            ({setState, getState}) => {
                setState({
                    undoStack: _.cloneDeep(getState().undoStack.concat(getState().game))
                });
                setState({
                    game: _.cloneDeep(getState().game.updateCellNotes(row, col, value))
                })
            },
        eraseCell: 
            (row: number, col: number) =>
            ({setState, getState}) => {
                setState({
                    undoStack: _.cloneDeep(getState().undoStack.concat(getState().game))
                });
                setState({
                    game: _.cloneDeep(getState().game.eraseCell(row, col))
                })
            },
        toggleNotes:
            () => 
            ({setState, getState}) => {
                setState({
                    game: _.cloneDeep(getState().game.toggleNotes())
                })
            },
        undoAction: 
            () =>
            ({setState, getState}) => {
                if (getState().undoStack.length == 0) {
                    return;
                }
                setState({
                    game: _.cloneDeep(getState().undoStack.pop())
                })
            },
        shuffleBoard: 
            () => 
            ({setState, getState}) => {
                if (getState().game.isSolved) {
                    return
                }
                setState({
                    undoStack: _.cloneDeep(getState().undoStack.concat(getState().game)),
                    isLoading: true,
                    isPaused: false
                });
                setTimeout(() => {
                    const modifiedGame = getState().game;
                    modifiedGame.board = boardShuffler(modifiedGame.board);
                    setState({
                        game: _.cloneDeep(modifiedGame),
                        isLoading: false
                    })
                }, 1200);
            },
        setMessage: 
            (message: string) => 
            ({getState, setState}) =>{
                if (getState().finishedGameMessage == undefined) {
                    setState({
                        finishedGameMessage: message
                    });
                }
            }
    },
    // optional, unique, mostly used for easy debugging
    name: 'game',
  });
  
  export const useGameState = createHook(Store);