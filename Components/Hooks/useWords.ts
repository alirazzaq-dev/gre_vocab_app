import { Word, Chapter, chapters } from "@/data/words";
import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";

const useWords = () => {


  const modalDisclosure = useDisclosure();
  // const [chapter, setChapter] = useState<Chapter>(chapters[0])
  const [selectedWord, setSelectedWord] = useState<Word>(chapters[0][0]);

  // const handleChapter = (chapter: number) => {
  //   setChapter(chapters[chapter])
  // }

  const selectWord = (word: Word) => {
    setSelectedWord(word);
    modalDisclosure.onOpen();
  }



  return { selectedWord, selectWord, modalDisclosure, chapters };

};

export default useWords;
