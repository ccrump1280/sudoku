import { Flex } from "@chakra-ui/react";
import { useGameState } from "../stateManagement/gameState";
import { useEffect } from "react";
import { FaPause, FaPlay } from 'react-icons/fa'

const Timer = () => {
    const [state, actions] = useGameState();
    useEffect(() => {
        const interval = setInterval(() => {
            if (!state.isLoading && !state.isPaused) {
                actions.incrementTimer();
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [state.isLoading, state.isPaused]);
    const playDisplay = state.game.isSolved ? "none" : "block"
    return (
        <Flex align={'center'} justify={'center'} color={"white"} fontSize={22}>
            <span style={{marginRight: '1rem'}}>{formatTime(state.timeElapsed)}</span>
            {state.isPaused ? <FaPlay onClick={() => actions.toggleTimer()} style={{display: playDisplay}}/> : <FaPause onClick={() => actions.toggleTimer()} />}
        </Flex>
    )
}
export default Timer;

export const formatTime = (timeElapsed: number) => {
    const minutes = Math.floor(timeElapsed/60);
    const seconds = timeElapsed % 60 > 9 ? timeElapsed % 60 : `0${timeElapsed % 60}`;
    return `${minutes}:${seconds}`;
}
