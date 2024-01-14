import MoonIcon from '@/icons/MoonIcon';
import SunIcon from '@/icons/SunIcon';
import { useColorMode, Flex, Button, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, HStack, ButtonGroup, Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { changeFocusMode, setFontSize, shuffleChapter } from '@/store/slice';
import { useRouter } from 'next/router';

const Header = () => {

    const { toggleColorMode, colorMode } = useColorMode();

    const dispatch = useDispatch();
    const fontSize = useSelector((state: RootState) => state.fontSize);
    const focusMode = useSelector((state: RootState) => state.focusMode);;
    const { asPath } = useRouter();
    const chapterNumber = Number(asPath.replace("/Chapter/", ""));

    return (
        <Box p={{base: "8px", md: "16px"}}>
            <Flex justify="space-between" border="0px solid red">

                <Button onClick={toggleColorMode}>
                    {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
                </Button>

                {
                    asPath.includes("Chapter") && (
                        <Box w="fit-content" border="0px solid red">
                            <ButtonGroup variant='outline'>
                                <Button
                                    onClick={() => dispatch(changeFocusMode())}
                                    bgColor={focusMode.active ? "blue.500" : "grey.500"}
                                >
                                    Focus
                                </Button>
                                <Button onClick={() => dispatch(shuffleChapter(chapterNumber))}>
                                    Shuffle
                                </Button>
                            </ButtonGroup>
                        </Box>
                    )
                }

            </Flex>

            {
                !focusMode.active && asPath.includes("Chapter") && (
                    <HStack align="center" mt="16px">
                        <Text mr="5px"> Size </Text>
                        <Slider defaultValue={fontSize} min={10} max={50} onChange={(size) => dispatch(setFontSize(size))} >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                    </HStack>
                )
            }


        </Box>
    )
}

export default Header