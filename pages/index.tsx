import Image from 'next/image'
import { Box, Flex, Button, Tag, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'


const Header = ({ handleShuffle }: { handleShuffle: () => void }) => {
  return (
    <Flex p="20px" justify="space-between" border="0px solid red">
      <Button>
        Theme
      </Button>
      <Button onClick={handleShuffle}>
        Shuffle
      </Button>
    </Flex>
  )
}

const WordModal = ( { word, isOpen, onClose }: 
  {
    word: string,
    isOpen: boolean,
    onClose: () => void
  }) => {
  

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay color="green" />

        <ModalContent>
          <ModalHeader> { word } </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Box>
              Description: Hello World
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

  const [selectedWord, setSelectedWord] = useState("");
  const [words, setWords] = useState(
    [
      "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", 
      "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", 
      "u", "v", "w", "x", "y", "z"
    ]
  )

  const handleSelect = (word: string) => {
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
      <Flex>
        {
          words.map((word, key ) => {
            return (
              <Box m="10px" key={key} cursor="pointer">
                <Tag fontSize={16} onClick={() => handleSelect(word)}> {word} </Tag>
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
