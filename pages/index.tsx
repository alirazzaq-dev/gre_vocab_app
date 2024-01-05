import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';


export default function Home() {

  const chaptersCount = useSelector((state: RootState) => state.chapters.length);
  const router = useRouter();

  return (
    <Box>
      {
        [...Array(chaptersCount)].map((_, key) => {
          return (
            <Box key={key} border="1px solid grey" my="10px" p="10px" cursor="pointer"
              onClick={() => {
                router.push(`/Chapter/${key + 1}`)
              }}
            >
              Chapter: {key + 1}
            </Box>
          )
        })
      }
    </Box>
  )
}
