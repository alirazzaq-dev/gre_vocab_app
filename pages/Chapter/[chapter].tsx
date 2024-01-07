import WordModal from '@/Components/Modals/WordModal';
import PassageAccordion from '@/Components/PassageAccordion';
import { RootState } from '@/store';
import { setSelectedWord, updateFocusMeaning, updateFocusModeNext, updateFocusModePrevious } from '@/store/slice';
import { Box, Button, Card, Center, Flex, HStack, ListItem, OrderedList, Tag, Text, Tooltip, VStack, useDisclosure } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { IoChevronForward } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";
import { playAudio } from '@/utils';

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
  const modalDisclosure = useDisclosure();

  return (
    <Box border="0px solid red">

      <Box border="0px solid red">
        <Text> Chapter : {data.chapterNumber} ({chapter.words.length} words)</Text>
      </Box>

      {/* Focus Mode OFf */}
      <Flex flexWrap="wrap" border="0px solid red">
        {
          !focusMode.active && chapter.words.map((word, key) => {
            return (
              <Box m="10px" key={key} cursor="pointer">
                <Tooltip label={word.definition} fontSize={fontSize} mt="5px">
                  <Tag
                    p="20px"
                    fontSize={fontSize}
                    onClick={() => {
                      dispatch(setSelectedWord(word))
                      modalDisclosure.onOpen()
                    }}
                  >
                    {word.word}
                  </Tag>
                </Tooltip>
              </Box>
            )
          })
        }
        <WordModal
          isOpen={modalDisclosure.isOpen}
          onClose={modalDisclosure.onClose}
        />
      </Flex>


      {/* Focus Mode ON */}
      {
        focusMode.active && chapter.words.map((word, key) => (
          <Box
            // border="1px solid red"
            py={{ base: "8px", md: "10px" }}
            w="full"
            key={key}
            display={key !== focusMode.index ? "none" : "block"}
          >
            <Card
              mx="auto"
              minH={{ base: "full", md: "400px" }}
              w={{ base: "full", md: "400px" }}
              fontSize={{ base: "20px", md: "36px" }}
              p={{ base: "12px", md: "24px" }}
            >
              {
                !focusMode.showMeaning && (
                  <Center h={{ base: "300px", md: "400px" }}>
                    {word.word}
                  </Center>
                )
              }

              {
                focusMode.showMeaning && (
                  <Box h="full" fontSize="16px" >
                    <HStack minH={{ base: "full", md: "400px" }}>
                      <VStack >

                        <HStack w="full">
                          <Text> Word: {word.word}</Text>
                          <Center cursor="pointer" onClick={() => playAudio(word.word)}>
                            🔊
                          </Center>
                        </HStack>

                        <Text w="full">
                          Description: {word.definition}
                        </Text>

                        <Text w="full">
                          Urdu Meaning: {word.urduMeaning}
                        </Text>

                        <Text w="full">
                          Sentences:
                        </Text>

                        <OrderedList w="full">
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

                      </VStack>

                    </HStack>

                  </Box>
                )
              }

            </Card>

            <Text fontSize="12px" textAlign="center"> {key + 1} / {chapter.words.length} </Text>

            <HStack
              justify="center"
              py={{ base: "8px", md: "10px" }}
              mx="auto"
              maxW="400px"
              justifyContent="space-between"
            >
              <Button boxSize="75px" onClick={() => dispatch(updateFocusModePrevious())}>
                <IoChevronBack />
              </Button>
              <Button boxSize="75px" onClick={() => { dispatch(updateFocusMeaning()) }}>
                <Text fontSize="16px"> 
                  {focusMode.showMeaning ? "word" : "meaning"}
                </Text>
              </Button>
              <Button boxSize="75px" onClick={() => dispatch(updateFocusModeNext({ chapterLength: chapter.words.length }))}>
                <IoChevronForward />
              </Button>
            </HStack>

          </Box>
        ))
      }

      {
        !focusMode.active && chapter.passages.length > 0 && (
          <Box mt="20px">
            <PassageAccordion passages={chapter.passages} />
          </Box>
        )
      }

    </Box >
  )

}

export default Chapter;