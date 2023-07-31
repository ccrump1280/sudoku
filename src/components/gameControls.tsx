import { Box, ButtonGroup, Button, SimpleGrid, Radio, RadioGroup, Flex, Heading, UnorderedList, ListItem, Text } from "@chakra-ui/react"
import { useGameState } from "../stateManagement/gameState"
import { useState } from 'react'
import { useKeyPress } from "../stateManagement/keyDownEvents"

export type Difficulty = 'beginner' | 'easy' | 'medium' | 'hard' |'expert'

const GameControls: React.FC = () => {
    const [state, actions] = useGameState();
    const [difficulty, setDifficulty] = useState<Difficulty>("easy");
    const selectedCell = state.game.selectedCell;

    const keydownHandler = (event: KeyboardEvent) => {
        if (state.isPaused) {
            return;
        }
        switch (event.key) {
            case '0': 
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
                }
                break;
            case 'ArrowDown':
                event.preventDefault();
                selectedCell ? actions.selectCell((selectedCell.row + 1) % 9, selectedCell.col): null;
                break;
            case 'ArrowLeft':
                if (selectedCell) {
                    if (selectedCell.col == 0) {
                        actions.selectCell(selectedCell.row, 8);
                    }else {
                        actions.selectCell(selectedCell.row, selectedCell.col-1);
                    }
                }
                break;
            case 'ArrowRight':
                selectedCell ? actions.selectCell(selectedCell.row, (selectedCell.col+1) % 9): null;
                break;
            case 'Backspace':
                selectedCell ? actions.eraseCell(selectedCell.row, selectedCell.col): null;
                break;
        }
        if (/^[1-9]$/.test(event.key)) {
            handleValueClick(Number(event.key));
        }
    }
    // this hook adds and removes listeners to window so handler gets called only once even if key is held
    useKeyPress(keydownHandler);
    
    const handleEraseClick = () => {
        if (selectedCell != undefined && !state.isPaused) {
            actions.eraseCell(selectedCell.row, selectedCell.col);
        }
    }
    const handleValueClick = (value: number) => {
        if (selectedCell == undefined || state.isPaused) {
            return;
        }
        if (state.game.isNotes) {
            actions.updateCellNotes(selectedCell.row, selectedCell.col, value);
        }else {
            actions.updateCellValue(selectedCell.row, selectedCell.col, value);
        }
    }
    const handleNotesClick = () => {
        if (!state.isPaused) {
            actions.toggleNotes();
        }
    }
    const handleUndoClick = () => {
        if (!state.isPaused) {
            actions.undoAction();
        }
    }
    return (
        <Box id="game-controls">
            <ButtonGroup>
                <Button onClick={handleUndoClick}>Undo</Button>
                <Button onClick={handleEraseClick}>Erase</Button>
                <Button onClick={handleNotesClick} isActive={state.game.isNotes}>Notes</Button>
            </ ButtonGroup>
            <Flex width='95%' margin='15px auto'>
                <SimpleGrid columns={3} spacing={1} margin="8px auto">
                    {[...Array(9)].map((_e, index) => {
                        return <Button key={index} className={'button-digit'} onClick={() => handleValueClick(index + 1)}>{index + 1}</Button>
                    })}
                </SimpleGrid>
                <Box color='white' width='50%' display={['none', 'none', 'block']}>
                    <Heading size='md'>GameControls</Heading>
                    <UnorderedList textAlign='left'>
                        <ListItem>shift = toggle notes</ListItem>
                        <ListItem>backspace = erase</ListItem>
                        <ListItem>arrow keys = select</ListItem>
                        <ListItem>delete = undo</ListItem>
                        <ListItem>p = pause/play</ListItem>
                    </UnorderedList>
                </Box>
            </Flex>
            <RadioGroup marginTop={2} color='white' colorScheme='orange' value={difficulty} onChange={(value: Difficulty) => setDifficulty(value)} className="difficulty">
                <Radio value='beginner'>Beginner</Radio>
                <Radio value='easy'>Easy</Radio>
                <Radio value='medium'>Medium</Radio>
                <Radio value='hard'>Hard</Radio>
                <Radio value='expert'>Expert</Radio>
            </RadioGroup>
            <Button colorScheme='orange' m="1rem" onClick={() => actions.newGame(difficulty)}>New Game</Button>
            <Button colorScheme='orange' m="1rem" onClick={() => actions.shuffleBoard()}>Shuffle</Button>
            <Text color="white">Stuck on a puzzle? Try shuffling for a new perspective!</Text>
        </ Box>
    )
}

export default GameControls;