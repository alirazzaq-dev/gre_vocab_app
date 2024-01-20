import { Chapter } from '@/data/chapters';
import { updateFocusModePrevious, updateFocusModeNext, updateFocusFlip } from '@/store/slice';
import { playAudio } from '@/utils';
import { Text, Card, Center, HStack, VStack, OrderedList, ListItem, Progress, Button, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react'
import ReactCardFlip from 'react-card-flip';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import useSwipe from '../Swipe/useSwipe';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';

const FocusModeOn = ({ chapter }: { chapter: Chapter }) => {

    const dispatch = useDispatch();
    const focusMode = useSelector((state: RootState) => state.focusMode);

    const swipeHandlers = useSwipe({
        onSwipedLeft: () => { dispatch(updateFocusModeNext({ chapterLength: chapter.words.length })) },
        onSwipedRight: () => { dispatch(updateFocusModePrevious()) }
    });

    const handleFlip = () => {
        dispatch(updateFocusFlip());
    }

    return (
        <Box hidden={!focusMode.active} w="full"  border="0px solid red" userSelect="none"> 

            {
                chapter.words.map((word, key) => (

                    <Box
                        mx="auto"
                        key={key}
                        py={{ base: "8px", md: "10px" }}
                        w={{ base: "full", md: "400px" }}
                        display={key !== focusMode.index ? "none" : "block"}
                        {...swipeHandlers}
                    >

                        <motion.div
                            initial={{ opacity: 0.5, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <ReactCardFlip isFlipped={focusMode.isFlipped} flipDirection="horizontal">

                                <Card
                                    mx="auto"
                                    h={{ base: "70vh", md: "500px" }}
                                    fontSize={{ base: "20px", md: "36px" }}
                                    p={{ base: "12px", md: "24px" }}
                                    onDoubleClick={handleFlip}
                                >

                                    {
                                        <Center h={{ base: "70vh", md: "500px" }}>
                                            <Text fontSize="4xl" fontWeight={700}>
                                                {word.word}
                                            </Text>
                                        </Center>
                                        // )
                                    }
                                </Card>

                                <Card
                                    mx="auto"
                                    h={{ base: "70vh", md: "500px" }}
                                    w={{ base: "full", md: "400px" }}
                                    fontSize={{ base: "20px", md: "36px" }}
                                    p={{ base: "12px", md: "24px" }}
                                    onDoubleClick={handleFlip}
                                >


                                    {
                                        <HStack fontSize="16px" minH={{ base: "70vh", md: "400px" }}>
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
                                    }
                                </Card>

                            </ReactCardFlip>
                        </motion.div>

                        <Progress size='xs' value={100 * ((key + 1) / chapter.words.length)} />
                        <Text fontSize="12px" textAlign="center"> {key + 1} / {chapter.words.length} </Text>

                    </Box>
                ))
            }

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
                <Button w="20" onClick={handleFlip}>
                    <Text fontSize="16px">
                        {focusMode.isFlipped ? "word" : "meaning"}
                    </Text>
                </Button>
                <Button w="20" onClick={() => dispatch(updateFocusModeNext({ chapterLength: chapter.words.length }))}>
                    <IoChevronForward />
                </Button>
            </HStack>

        </Box>)
}

export default FocusModeOn