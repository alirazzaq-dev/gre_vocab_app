import { Word } from '@/data/words'
import { Modal, Text, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, Flex, HStack, OrderedList, ListItem } from '@chakra-ui/react'
import React from 'react'
import { Configuration, OpenAIApi } from "openai";
import { updateFocusModeNext } from '@/store/slice';
import { useDispatch } from 'react-redux';
// import Image from 'next/image';


const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const WordModal = ({ word, isOpen, onClose }:
  {
    word: Word,
    isOpen: boolean,
    onClose: () => void;
  }) => {

  const dispatch = useDispatch();

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

                </Text>
              </Box>

            </HStack>

          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default WordModal