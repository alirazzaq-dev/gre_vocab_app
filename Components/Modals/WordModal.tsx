import { Word } from '@/data/words'
import { Modal, Text, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, Flex, HStack, OrderedList, ListItem } from '@chakra-ui/react'
import React from 'react'
import { Configuration, OpenAIApi } from "openai";
// import Image from 'next/image';


const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const WordModal = ({ word, isOpen, onClose, setFocus }:
  {
    word: Word,
    isOpen: boolean,
    onClose: () => void;
    setFocus: (value: React.SetStateAction<{ visible: boolean; index: number; }>) => void
  }) => {


  return (
    <>
      <Modal isOpen={isOpen} onClose={() => { onClose(); setFocus((e) => ({ ...e, index: e.index++ })) }}>
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