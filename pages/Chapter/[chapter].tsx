import useWords from '@/Components/Hooks/useWords';
import WordModal from '@/Components/Modals/WordModal';
import { chapters } from '@/data/words';
import { Box, Button, ButtonGroup, Flex, HStack, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Tag, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react'

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { chapter } = context.query as { chapter: string };


  return {
    props: {
      chapterNumber: chapter
    }
  }

}

const Chapter = (data: { chapterNumber: string }) => {

  const { selectWord, selectedWord, modalDisclosure } = useWords();
  const [chapter, setChapter] = useState(chapters[Number(data.chapterNumber) - 1]);

  const [fontSize, setFontSize] = useState(50);

  const [focus, setFocus] = useState({
    visible: false,
    index: 0
  });


  const shuffleChapter = () => {
    let shuffledChapter = chapter;
    setChapter((oldChapter) => {
      shuffledChapter = [...oldChapter];
      for (let i = shuffledChapter.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledChapter[i], shuffledChapter[j]] = [shuffledChapter[j], shuffledChapter[i]];
      }
      return shuffledChapter
    })
  }

  return (
    <Box>

      <Flex justify='space-between'>
        <Text> Chapter : {data.chapterNumber} ({chapter.length} words)</Text>

        <Box w="fit-content" border="0px solid red">

          <ButtonGroup variant='outline'>
            <Button onClick={() => setFocus((e) => ({ index: 0, visible: !focus.visible }))}>
              Focus
            </Button>
            <Button onClick={() => shuffleChapter()}>
              Shuffle
            </Button>
          </ButtonGroup>

          <HStack align="center" mt="5px">
            <Text mr="5px"> Size </Text>
            <Slider defaultValue={fontSize} min={10} max={50} onChange={(size) => setFontSize(size)} >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </HStack>

        </Box>

      </Flex>

      <Box>
        <Flex flexWrap="wrap">
          <Flex w="100vw" flexWrap="wrap" border="0px solid red">

            {
              chapter.map((word, key) => {
                return (
                  <Box m="10px" key={key} cursor="pointer">
                    {
                      <Tag
                        hidden={focus.visible && focus.index < key}
                        p="20px"
                        fontSize={fontSize}
                        onClick={() => {
                          selectWord(word)
                        }}
                      >
                        {word.word}
                      </Tag>
                    }
                  </Box>
                )
              })
            }

            <WordModal
              setFocus={setFocus}
              isOpen={modalDisclosure.isOpen}
              onClose={modalDisclosure.onClose}
              word={selectedWord}
            />

          </Flex>
        </Flex>

      </Box>

    </Box >
  )

}

export default Chapter;