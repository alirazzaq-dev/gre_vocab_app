import { Box, Flex, Tag } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';


export default function Home() {

  const chapters = useSelector((state: RootState) => state.chapters);
  const router = useRouter();

  return (
    <Box>

      {
        chapters.map((chapter, key) => {
          return (
            <Box key={key} border="1px solid grey" my="10px" p="10px" cursor="pointer"
              onClick={() => {
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
