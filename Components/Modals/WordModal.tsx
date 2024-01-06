import { Modal, Text, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, HStack, OrderedList, ListItem } from '@chakra-ui/react'
import React from 'react'
import { updateFocusModeNext } from '@/store/slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import axios from 'axios';

const WordModal = ({ isOpen, onClose }:
  {
    isOpen: boolean,
    onClose: () => void;
  }
) => {

  const dispatch = useDispatch();
  const word = useSelector((state: RootState) => state.selectedWord);
  const playAudio = async (word: string) => {
    const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    // console.log("res.data[0]: ", res.data[0]);
    if(res.data[0].phonetics.length > 0){
      const audio = new Audio(res.data[0].phonetics[0].audio);
      audio.play();
    }
    else {
      console.log("No audio found for: ", word);
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          dispatch(updateFocusModeNext());
        }
        }
      >
        <ModalOverlay color="green" backdropFilter='blur(15px)' />

        <ModalContent minW={{ base: "300px", lg: "800px" }} minH="300px" my="auto">
          <ModalHeader> 
            
            <HStack>
              <Text> {word.word}</Text>
              <Box cursor="pointer" onClick={() => playAudio(word.word)}>
                🔊
              </Box>
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