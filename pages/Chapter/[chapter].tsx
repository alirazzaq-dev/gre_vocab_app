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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { chapter } = context.query as { chapter: string };
  return {
    props: {
      chapterNumber: chapter
    }
  }

}

const Chapter = (data: { chapterNumber: string }) => {

  const { fontSize, focusMode, chapter } = useSelector((state: RootState) => (
    {
      fontSize: state.fontSize,
      focusMode: state.focusMode,
      chapter: state.chapters[Number(data.chapterNumber) - 1],
    })
  );

  // const fontSize = useSelector((state: RootState) => state.fontSize);
  // const focusMode = useSelector((state: RootState) => state.focusMode);
  // const chapter = useSelector((state: RootState) => state.chapters[Number(data.chapterNumber) - 1]);

  const dispatch = useDispatch();
  const modalDisclosure = useDisclosure();
  const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  return (
    <Box>

      {/* <Flex justify='space-between'> */}
        <Text> Chapter : {data.chapterNumber} ({chapter.words.length} words)</Text>
      {/* </Flex> */}

      {/* Focus Mode OFf */}
      <Box>
        <Flex flexWrap="wrap">
          <Flex w="100vw" flexWrap="wrap" border="0px solid red">
            {
              !focusMode.active && chapter.words.map((word, key) => {
                return (
                  <Box m="10px" key={key} cursor="pointer">
                    <Tooltip label={word.definition} fontSize={fontSize} mt="5px">
                      <Tag
                        // bgColor={focusMode.visible && focusMode.index === key ? "blue.500" : "grey.500"}
                        // hidden={focusMode.visible && focusMode.index < key}
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

        </Flex>

      </Box>


      {/* Focus Mode ON */}
      {
        focusMode.active && chapter.words.map((word, key) => (
          <Box
            p="20px"
            w="full"
            key={key}
            display={key !== focusMode.index ? "none" : "block"}
          >
            <Card
              mx="auto"
              minH={{ base: "full", md: "400px" }}
              w={{ base: "300px", md: "400px" }}
              fontSize={{base: "20px", md: "36px"}}
              p={{base: "12px", md: "24px"}}
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
                    <HStack>
                      <VStack >

                      <Text w="full">
                          Word: {word.word}
                        </Text>

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
          </Box>
        ))
      }


      {
        focusMode.active && (
          <HStack
            justify="center"
            w={{ base: "300px", md: "400px" }}
            mx="auto"
            justifyContent="space-between"
          >
            <Button onClick={() => dispatch(updateFocusModePrevious())}>
              <IoChevronBack />
            </Button>
            <Button onClick={() => { dispatch(updateFocusMeaning()) }}>
              { focusMode.showMeaning ? "word" : "meaning"}
            </Button>
            <Button onClick={() => dispatch(updateFocusModeNext({ chapterLength: chapter.words.length }))}>
              <IoChevronForward />
            </Button>
          </HStack>
        )

      }


      <Box>
        {
          !focusMode.active && chapter.passages.length > 0 && (
            <Box mt="20px">
              <PassageAccordion passages={chapter.passages} />
            </Box>
          )
        }
      </Box>



    </Box >
  )

}

export default Chapter;