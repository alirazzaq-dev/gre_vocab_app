import { Modal, Text, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, HStack, OrderedList, ListItem } from '@chakra-ui/react'
import React from 'react'
import { updateFocusModeNext } from '@/store/slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';

const WordModal = ({ isOpen, onClose }:
  {
    isOpen: boolean,
    onClose: () => void;
  }
) => {

  const dispatch = useDispatch();
  const word = useSelector((state: RootState) => state.selectedWord);


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
          <ModalHeader> {word?.word} </ModalHeader>
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