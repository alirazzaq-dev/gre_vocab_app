import Image from 'next/image'
import { useColorMode, Text, Box, Flex, Button, Tag, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import SunIcon from '@/icons/SunIcon';
import MoonIcon from '@/icons/MoonIcon';
import { Word, wordsData } from '@/data/words';

const Header = ({ handleShuffle }: {
  handleShuffle: () => void,
}) => {

  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Flex p="20px" justify="space-between" border="0px solid red">
      <Button onClick={toggleColorMode}>
        {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
      </Button>


      <Button onClick={handleShuffle}>
        Shuffle
      </Button>
    </Flex>
  )
}

const WordModal = ({ word, isOpen, onClose }:
  {
    word: Word | undefined,
    isOpen: boolean,
    onClose: () => void
  }) => {


  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay color="green" />

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

export default function Home() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedWord, setSelectedWord] = useState<Word>();
  const [words, setWords] = useState<Word[]>(wordsData)

  const handleSelect = (word: Word) => {
    setSelectedWord(word);
    onOpen();
  }

  const handleShuffle = () => {
    let shuffledWords = words;
    setWords((oldWords) => {
      shuffledWords = [...oldWords];
      for (let i = shuffledWords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
      }
      return shuffledWords
    })
  }

  return (
    <Box>
      <Header handleShuffle={handleShuffle} />
      <Flex w="100vw" flexWrap="wrap" border="0px solid red">
        {
          words.map((word, key) => {
            return (
              <Box m="10px" key={key} cursor="pointer">
                <Tag fontSize={16} onClick={() => handleSelect(word)}> {word.name} </Tag>
              </Box>
            )
          })
        }
      </Flex>

      <WordModal
        isOpen={isOpen}
        onClose={onClose}
        word={selectedWord}
      />

    </Box>
  )
}
