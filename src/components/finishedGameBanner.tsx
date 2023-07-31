import { Box, Button, Heading, Text, Flex, Select } from "@chakra-ui/react"
import { useCallback, useState } from "react"
import Particles from "react-particles"
import type { Engine } from "tsparticles-engine"
import { loadConfettiPreset } from "tsparticles-preset-confetti"
import { useGameState } from "../stateManagement/gameState"
import { formatTime } from "./timer"
import type { Difficulty } from "./gameControls"


const FinishedGameBanner: React.FC = () => {
    const [state, actions] = useGameState();
    const [difficulty, setDifficulty] = useState(state.game.difficulty);
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadConfettiPreset(engine);
    }, [])

    const particlesConfig = {
        preset: "confetti",
        particles: {
            number: {
                value: 100
            }
        }
    }
    actions.setMessage(generateMessage(state.timeElapsed));
    return (
        <Box id="finished-game-banner" borderRadius={10} maxH={["270px", "300px"]}>
            <Particles options={particlesConfig} init={particlesInit} />
            <Heading as="h1" size= {["md", "lg"]} mt="1rem">Congratulations!</Heading>
            <Text m="1rem" fontSize={["14px", "20px"]}>You completed the {state.game.difficulty} puzzle in {formatTime(state.timeElapsed)} <br/> {state.finishedGameMessage}</Text>
            <Flex justifyContent="center" display={["block", "flex"]} mb="1rem">
                <Button colorScheme='orange' mb="1rem" onClick={() => actions.newGame(difficulty)}>New Game</Button>
                <Select width="150px" m={["auto", "0 1rem"]} borderColor="purple" bg="#CBC3E3" value={difficulty} onChange={(e) => isDifficulty(e.target.value) ? setDifficulty(e.target.value): undefined}>
                    <option value="beginner">Beginner</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    <option value="expert">Expert</option>
                </Select>
            </Flex>
        </Box>
    )
}
export default FinishedGameBanner

const COMPLETED_PUZZLE_MESSAGES = {
    5: ["Wow that was fast! Too fast... Did you cheat?", "That's got to be some kind of record!", "You must be a Sudoku Sensei!", "You must have a computer for a brain!"],
    15: ["Incredible! You finished in no time!", "That was a lightning fast finish!", "You must have eyes like a hawk!", "You are a sudoku savant!"],
    30: ["Well done! You completed the game in a jiffy.", "Nice Job! You solved the puzzle like a champ.", "Impressive! You solved the puzzle in no time.", "Excellent! You finished the game faster than expected."],
    45: ["You did it! Now it's time to take a break and grab a snack.", "Not bad! You could have done it faster, but you still did alright.", "You cracked it! Not the quickest, but you still did it!", "Good job! You took your time and got it done."],
    46: ["Wow, that was a marathon! You must have really enjoyed the challenge!", "Are you sure you were solving a sudoku and not writing a novel?", "Did you get lost in the puzzle? It took you awhile to find your way out!", "You solved the puzzle in record time! Maybe not the kind of record you wanted. Was there a nap involved?"]
}

export const generateMessage = (timeElapsed: number) => {
    let messagesArray: string[] = [];
    if (timeElapsed <= 60*5) {
        messagesArray = COMPLETED_PUZZLE_MESSAGES[5];
    }else if (timeElapsed <= 60*15) {
        messagesArray = COMPLETED_PUZZLE_MESSAGES[15];
    }else if (timeElapsed <= 60*30) {
        messagesArray = COMPLETED_PUZZLE_MESSAGES[30];
    }else if (timeElapsed <= 60*60) {
        messagesArray = COMPLETED_PUZZLE_MESSAGES[45];
    }else {
        messagesArray = COMPLETED_PUZZLE_MESSAGES[46];
    }
    return messagesArray[Math.floor(Math.random()*messagesArray.length)];
}

const isDifficulty = (value: string): value is Difficulty => {
    return ["beginner", "easy", "medium", "hard", "expert"].includes(value);
}