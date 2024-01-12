import WordModal from '@/Components/Modals/WordModal';
import PassageAccordion from '@/Components/PassageAccordion';
import { RootState } from '@/store';
import { changeFocusMode, setSelectedWord, shuffleChapter, updateFocusMeaning, updateFocusModeNext, updateFocusModePrevious } from '@/store/slice';
import { Box, Button, Card, Center, Flex, HStack, ListItem, OrderedList, Tag, Text, Tooltip, VStack, useDisclosure } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { IoChevronForward } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";
import { playAudio } from '@/utils';
import useSwipe from "@/Components/Swipe/useSwipe";

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

  const swipeHandlers = useSwipe(
    {
      onSwipedLeft: () => dispatch(updateFocusModeNext({ chapterLength: chapter.words.length })),
      onSwipedRight: () => dispatch(updateFocusModePrevious())
    });

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowLeft":
          dispatch(updateFocusModePrevious())
          break;
        case "ArrowRight":
          dispatch(updateFocusModeNext({ chapterLength: chapter.words.length }))
          break;
        case " ":
          dispatch(updateFocusMeaning())
          break;
        case "Shift":
          dispatch(changeFocusMode())
          break;
        default:
          break;
      }
      // if(e.key === "ArrowLeft"){
      //   dispatch(updateFocusModePrevious())
      // }
      // else if(e.key === "ArrowRight"){
      //   dispatch(updateFocusModeNext({ chapterLength: chapter.words.length }))
      // }
      // else if(e.key === " "){
      //   dispatch(updateFocusMeaning())
      // }
      // else if(e.key === "Shift"){
      //   dispatch(changeFocusMode())
      // }      
    }

    document.addEventListener('keydown', handleKeyDown);

    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);


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
                <Tooltip label={word.definition} placement='top' fontSize={fontSize} mt="5px">
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
            key={key}
            py={{ base: "8px", md: "10px" }}
            w="full"
            display={key !== focusMode.index ? "none" : "block"}
            {...swipeHandlers}
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
                          <Text> {word.word}</Text>
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
              <Button w="20" onClick={() => dispatch(updateFocusModePrevious())}>
                <IoChevronBack />
              </Button>
              <Button w="20" onClick={() => { dispatch(updateFocusMeaning()) }}>
                <Text fontSize="16px">
                  {focusMode.showMeaning ? "word" : "meaning"}
                </Text>
              </Button>
              <Button w="20" onClick={() => dispatch(updateFocusModeNext({ chapterLength: chapter.words.length }))}>
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