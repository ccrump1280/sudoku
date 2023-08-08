import { Box, Heading, UnorderedList, ListItem } from '@chakra-ui/react';

const ControlsList: React.FC = () => {
    return (
        <Box color='white' width='50%' display={{base:'none', '2xl': 'block'}} m='1rem auto'>
            <Heading size='md'>GameControls</Heading>
            <UnorderedList textAlign='left' m='auto' width='fit-content'>
                <ListItem>shift = toggle notes</ListItem>
                <ListItem>backspace = erase</ListItem>
                <ListItem>arrow keys = select</ListItem>
                <ListItem>delete = undo</ListItem>
                <ListItem>p = pause/play</ListItem>
            </UnorderedList>
        </Box>
    )
};

export default ControlsList;