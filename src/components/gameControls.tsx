import { Box, ButtonGroup, Button, Flex} from '@chakra-ui/react'
import { useGameState } from '../stateManagement/gameState'
import { useKeyPress, keydownHandler } from '../stateManagement/keyDownEvents'
import { handleValueClick, handleEraseClick, handleNotesClick, handleUndoClick } from '../stateManagement/onClickHandlers'

export type Difficulty = 'beginner' | 'easy' | 'medium' | 'hard' |'expert'

const GameControls: React.FC = () => {
    const [state, _actions] = useGameState();

    useKeyPress(keydownHandler);
    
    return (
        <Box width='98%' maxWidth='500px' m='auto'>
            <Flex justifyContent='space-between' m='1rem auto' width='100%'>
                    {[...Array(9)].map((_e, index) => {
                        return <Button key={index} variant='valueButton' size='xs' onClick={() => handleValueClick(index + 1)}>{index + 1}</Button>
                    })}
            </Flex>
            <ButtonGroup>
                <Button onClick={handleUndoClick}>Undo</Button>
                <Button onClick={handleEraseClick}>Erase</Button>
                <Button onClick={handleNotesClick} isActive={state.game.isNotes} variant='notesButton'>Notes</Button>
            </ ButtonGroup>
        </ Box>
    )
}

export default GameControls;