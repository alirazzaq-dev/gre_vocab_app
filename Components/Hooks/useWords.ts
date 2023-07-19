import { Word, wordsData } from "@/data/words";
import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";

const useWords = () => {

  const modalDisclosure = useDisclosure();
  const [selectedWord, setSelectedWord] = useState<Word>();
  const [words, setWords] = useState<Word[]>(wordsData)


  const handleSelect = (word: Word) => {
    setSelectedWord(word);
    modalDisclosure.onOpen();
  }

  const handleShuffle = () => {
    let shuffledWords = words;
    setWords((oldWords) => {
      shuffledWords = [...oldWords];
      for (let i = shuffledWords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
      }
      return shuffledWords
    })
  }

  return { words, selectedWord, handleSelect, handleShuffle, modalDisclosure };
  
};

export default useWords;
