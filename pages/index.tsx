import { Box, Flex, Tag, useRadio } from '@chakra-ui/react'
import Header from '@/Components/Header';
import WordModal from '@/Components/Modals/WordModal';
import useWords from '@/Components/Hooks/useWords';
import { useRouter } from 'next/router';


export default function Home() {

  const { chapters } = useWords();
  const router = useRouter();

  return (
    <Box>

      {
        chapters.map((chapter, key) => {
          return (
            <Box key={key} border="1px solid grey" my="10px" p="10px" cursor="pointer"
              onClick={() => {
                // handleChapter(key)
                router.push(`/Chapter/${key + 1}`)
              }}
            >
              Chapter: {key + 1}
              <Flex flexWrap="wrap">
                {
                  chapter.map((word, key) => {
                    return (
                      <Box m="10px" key={key} >
                        <Tag p="10px" fontSize={16}> {word.word} </Tag>
                      </Box>
                    )
                  })
                }
              </Flex>
            </Box>
          )
        })
      }





    </Box>
  )
}
