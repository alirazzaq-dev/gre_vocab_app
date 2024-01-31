import { Modal, Text, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, HStack, OrderedList, ListItem, Center } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { playAudio } from '@/utils';

const WordModal = ({ isOpen, onClose }:
  {
    isOpen: boolean,
    onClose: () => void;
  }
) => {

  const word = useSelector((state: RootState) => state.selectedWord);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => onClose()}
      >
        <ModalOverlay color="green" backdropFilter='blur(15px)' />

        <ModalContent minW={{ base: "300px", lg: "800px" }} minH="300px" my="auto">
          <ModalHeader>

            <HStack>
              <Text> {word.word}</Text>
              <Center cursor="pointer" onClick={() => playAudio(word.word)}>
                🔊
              </Center>
            </HStack>

          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>

            <HStack>

              <Box>
                <Text>
                  Description: {word.definition}
                </Text>

                <Text>
                  Urdu Meaning: {word.urduMeaning}
                </Text>

                <Text>
                  Sentences:
                </Text>

                <OrderedList>
                  {
                    word.exampleSentences.map((sentence, key) => {
                      return (
                        <ListItem key={key} ml="10px">
                          {sentence}
                        </ListItem>
                      )
                    })
                  }
                </OrderedList>

              </Box>

            </HStack>

          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default WordModal