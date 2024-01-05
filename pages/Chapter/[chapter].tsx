import useWords from '@/Components/Hooks/useWords';
import WordModal from '@/Components/Modals/WordModal';
import { RootState } from '@/store';
import { updateFocusModeNext } from '@/store/slice';
import { Box, Button, Flex, Tag, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { chapter } = context.query as { chapter: string };


  return {
    props: {
      chapterNumber: chapter
    }
  }

}

const Chapter = (data: { chapterNumber: string }) => {

  const fontSize = useSelector((state: RootState) => state.fontSize);
  const focusMode = useSelector((state: RootState) => state.focusMode);
  const chapter = useSelector((state: RootState) => state.chapters[Number(data.chapterNumber) - 1]);
  const dispatch = useDispatch();

  const { selectWord, selectedWord, modalDisclosure } = useWords();
  
  return (
    <Box>

      <Flex justify='space-between'>
        <Text> Chapter : {data.chapterNumber} ({chapter.length} words)</Text>
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
                        bgColor={focusMode.visible && focusMode.index === key ? "blue.500" : "grey.500"}
                        hidden={focusMode.visible && focusMode.index < key}
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
              isOpen={modalDisclosure.isOpen}
              onClose={modalDisclosure.onClose}
              word={selectedWord}
            />

          </Flex>
        </Flex>

      </Box>

      {
        focusMode.visible && (
          <Flex w="full" justify="center" mt="20px">
            <Button onClick={() => dispatch(updateFocusModeNext())}>
            {/* <Button> */}
              Next
            </Button>
          </Flex>
        )
      }

    </Box >
  )

}

export default Chapter;