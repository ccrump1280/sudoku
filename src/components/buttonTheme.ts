import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"

// Defining a custom variant
const valueButton = defineStyle({
  color: 'orange',
  _hover: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  _active: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  fontSize: ['24px', '36px'],
  padding: '0 0.5rem',
  height: 'auto'
});

const notesButton = defineStyle({
  boxSizing: 'border-box',
  backgroundColor: 'white',
  _active: {
    border: '2px solid orange'
  },
  _hover: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  }
})

export const buttonTheme = defineStyleConfig({
  variants: {valueButton, notesButton}
})

