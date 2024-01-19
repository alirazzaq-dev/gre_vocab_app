import PassageAccordion from '@/Components/PassageAccordion';
import { RootState, store } from '@/store';
import { changeFocusMode, makeIndexZero, updateFocusFlip, updateFocusModeNext, updateFocusModePrevious } from '@/store/slice';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import FocusModeOn from '@/Components/FocusModeCards/FocusModeOn';
import FocusModeOff from '@/Components/FocusModeCards/FocusModeOff';


export const getStaticPaths = async () => {
  const { chapters } = store.getState()
  const paths = chapters.map((_, index) => ({
    params: { chapter: String(index + 1) },
  }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const chapterNumber = params?.chapter;
  return { props: { chapterNumber } }
}

const ChapterX = ({ chapterNumber }: { chapterNumber: string }) => {

  const dispatch = useDispatch();
  const focusMode = useSelector((state: RootState) => state.focusMode);
  const chapter = useSelector((state: RootState) => state.chapters[Number(chapterNumber) - 1]);

  const bg = useColorModeValue("primary.light", "primary.dark");

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
          dispatch(updateFocusFlip())
          break;
        case "Shift":
          dispatch(changeFocusMode())
          break;
        default:
          break;
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  useEffect(() => {
    dispatch(makeIndexZero());
  }, [])

  return (
    <Box border="0px solid red" bg={bg} >

      <Box border="0px solid red">
        <Text> Chapter : {chapterNumber} </Text>
      </Box>

      <FocusModeOff chapter={chapter} />
      <FocusModeOn chapter={chapter} />

      <Box mt="20px" hidden={focusMode.active}>
        <PassageAccordion passages={chapter.passages} />
      </Box>

    </Box >
  )

}

export default ChapterX;