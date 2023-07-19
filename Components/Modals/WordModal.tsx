import { Word } from '@/data/words'
import { Modal, Text, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, Flex } from '@chakra-ui/react'
import React from 'react'

const WordModal = ({ word, isOpen, onClose }:
    {
      word: Word | undefined,
      isOpen: boolean,
      onClose: () => void
    }) => {
  
  
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay color="green" backdropFilter='blur(15px)' />
  
          <ModalContent maxW={{base: "300px", lg: "600px" }} minH="300px" my="auto">
            <ModalHeader> {word?.name} </ModalHeader>
            <ModalCloseButton />
  
            <ModalBody>
              <Box>
                <Text>
                  Description: {word?.desc}
                </Text>
                <Text>
                  Example: {word?.example}
                </Text>
              </Box>
            </ModalBody>
  
            {/* <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter> */}
          </ModalContent>
        </Modal>
      </>
    )
  }
  
export default WordModal