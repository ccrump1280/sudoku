import { Box, Button, Radio, RadioGroup, Text } from '@chakra-ui/react'
import { useGameState } from '../stateManagement/gameState'
import { useState } from 'react'

type Difficulty = 'beginner' | 'easy' | 'medium' | 'hard' | 'expert'
const ShuffleAndNewGameControls: React.FC = () => {
    const [_state, actions] = useGameState();
    const [difficulty, setDifficulty] = useState<Difficulty>('easy');
    return (
        <Box>
            <RadioGroup marginTop={2} color='white' colorScheme='orange' value={difficulty} onChange={(value: Difficulty) => setDifficulty(value)} className='difficulty'>
                <Radio value='beginner'>Beginner</Radio>
                <Radio value='easy'>Easy</Radio>
                <Radio value='medium'>Medium</Radio>
                <Radio value='hard'>Hard</Radio>
                <Radio value='expert'>Expert</Radio>
            </RadioGroup>
            <Button colorScheme='orange' m='1rem' onClick={() => actions.newGame(difficulty)}>New Game</Button>
            <Button colorScheme='orange' m='1rem' onClick={() => actions.shuffleBoard()}>Shuffle</Button>
            <Text color='white'>Stuck on a puzzle? Try shuffling for a new perspective!</Text>
        </Box>
    )
}

export default ShuffleAndNewGameControls;