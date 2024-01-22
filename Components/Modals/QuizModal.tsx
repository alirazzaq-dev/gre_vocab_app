import { Modal, Text, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, HStack, OrderedList, ListItem, Center, ModalFooter, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { updateFocusModeNext } from '@/store/slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import axios from 'axios';
import { playAudio } from '@/utils';
import { Chapter, Word } from '@/data/chapters';

const QuizModal = ({ isOpen, onClose }:
  {
    isOpen: boolean,
    onClose: () => void;
  }
) => {

  const quiz = (useSelector((state: RootState) => state.quiz));

  const [quizData, setQuizData] = useState({
    isInProgress: false,
    currentQuestionIndex: 0,
    totalQuestions: 10,
  })


  
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => onClose()}
      >
        <ModalOverlay color="green" backdropFilter='blur(15px)' />

        <ModalContent minW={{ base: "300px", lg: "800px" }} minH="300px" my="auto">
          <ModalHeader>

            <HStack>
              <Text> Quiz # {quiz.quizNumber}</Text>
              <Text> questions: {quiz.quizChapter?.words.length} </Text>
            </HStack>

          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>

            <HStack>

              <Box>
                <Text>
                  Description: 
                </Text>

                <Text>
                  Urdu Meaning: 
                </Text>

                <Text>
                  Sentences:
                </Text>

                <OrderedList>
                  {
                    // word.exampleSentences.map((sentence, key) => {
                    //   return (
                    //     <ListItem key={key} ml="10px">
                    //       {sentence}
                    //     </ListItem>
                    //   )
                    // })
                  }
                </OrderedList>

              </Box>

            </HStack>

          </ModalBody>

          <ModalFooter>
            <Button size="sm">
               Next
            </Button>
          </ModalFooter>

        </ModalContent>
      </Modal>
    </>
  )
}

export default QuizModal