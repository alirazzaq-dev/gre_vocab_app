import PassageAccordion from '@/Components/PassageAccordion';
import { RootState } from '@/store';
import { changeFocusMode, makeIndexZero, updateFocusMeaning, updateFocusModeNext, updateFocusModePrevious } from '@/store/slice';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import React, { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Chapter, chapters } from '@/data/chapters';
import FocusModeOn from '@/Components/FocusModeCards/FocusModeOn';
import FocusModeOff from '@/Components/FocusModeCards/FocusModeOff';


export const getStaticPaths = async () => {
  const paths = chapters.map((_, index) => ({
    params: { chapter: String(index + 1) },
  }))
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const chapterNumber = params?.chapter;
  const chapter = chapters[Number(chapterNumber) - 1]
  return { props: { chapter, chapterNumber } }
}

const ChapterX = ({ chapter, chapterNumber }: { chapter: Chapter, chapterNumber: string }) => {

  const dispatch = useDispatch();
  const focusMode = useSelector((state: RootState) => state.focusMode);
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
          dispatch(updateFocusMeaning())
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