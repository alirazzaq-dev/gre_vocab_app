import { setSelectedWord } from '@/store/slice'
import { Flex, Tooltip, Tag, Box, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import WordModal from '../Modals/WordModal'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { Chapter } from '@/data/chapters'

const FocusModeOff = ({ chapter }: { chapter: Chapter }) => {

    const dispatch = useDispatch();
    const focusMode = useSelector((state: RootState) => state.focusMode);
    const fontSize = useSelector((state: RootState) => state.fontSize);

    const modalDisclosure = useDisclosure();

    return (
        <Flex flexWrap="wrap" border="0px solid red" hidden={focusMode.active} userSelect="none">
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
    )
}

export default FocusModeOff