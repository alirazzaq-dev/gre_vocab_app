import { Box, Flex, Tag } from '@chakra-ui/react'
import Header from '@/Components/Header';
import WordModal from '@/Components/Modals/WordModal';
import useWords from '@/Components/Hooks/useWords';


export default function Home() {

  const {handleSelect, handleShuffle, selectedWord, modalDisclosure, words} = useWords();

  return (
    <Box p="16px">

      <Header handleShuffle={handleShuffle} />

      <Flex w="100vw" flexWrap="wrap" border="0px solid red">
        {
          words.map((word, key) => {
            return (
              <Box m="10px" key={key} cursor="pointer">
                <Tag p="10px" fontSize={16} onClick={() => handleSelect(word)}> {word.name} </Tag>
              </Box>
            )
          })
        }
        <WordModal
          isOpen={modalDisclosure.isOpen}
          onClose={modalDisclosure.onClose}
          word={selectedWord}
        />

      </Flex>


    </Box>
  )
}
