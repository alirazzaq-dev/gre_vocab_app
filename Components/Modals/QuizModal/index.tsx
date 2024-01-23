import React from 'react'
import { Modal, Text, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, OrderedList, ListItem, Center, Button, VStack, Flex } from '@chakra-ui/react'
import { capitalize } from '@/utils';
import useQuizHook from './useQuizHook';


const QuizModal = ({ isOpen, onClose }:
  {
    isOpen: boolean,
    onClose: () => void;
  }
) => {

  const {quiz, handleAnswer, handleNext, handleStartQuiz, quizData} = useQuizHook(isOpen);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => onClose()}
      >
        <ModalOverlay color="green" backdropFilter='blur(15px)' />

        <ModalContent minW={{ base: "300px", lg: "800px" }} minH="300px" my="auto">
          <ModalHeader>

            <Box>
              <Text> Quiz # {quiz.quizNumber}</Text>
            </Box>

          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>

            <Box>
              {
                !quizData.isInProgress && (
                  <Center h="200px">
                    <Button size="sm" onClick={handleStartQuiz}> Start Quiz</Button>
                  </Center>
                )
              }

              {
                quizData.isInProgress && !quizData.isEnded &&
                quizData.questions.map((question, index) => {
                  return (
                    <Box border="0px solid red" key={index} hidden={question.id != quizData.currentQuestionIndex}>

                      <Flex justify="space-between" align="center">
                        <Text fontWeight="bold" fontSize="24px"> {question.question} </Text>
                        <Text fontSize="12px"> {index + 1}/{quizData.questions.length} </Text>
                      </Flex>

                      <OrderedList>
                        {
                          question.options.map((option, index) => {
                            return (
                              <ListItem
                                cursor={!question.isAnswered ? "pointer" : "not-allowed"}
                                p="5px"
                                my="10px"
                                key={index}
                                onClick={() => handleAnswer(question.id, option)}
                                border="1px solid red"
                                borderRadius="3px"
                                borderColor="gray.500"
                                bgColor={
                                  !question.isAnswered ? "transparent" :
                                    question.userAsnwer && option == question.answer ? "green.500" :
                                      option == question.answer ? "green.500" :
                                        question.userAsnwer == option ? "red.500" : "transparent"
                                }
                              >
                                <Text w="full">
                                  {capitalize(option)}
                                </Text>

                              </ListItem>
                            )
                          })
                        }
                      </OrderedList>

                      <br />
                      <VStack spacing={0} m="20px">
                        <Text hidden={!question.isAnswered} > {question.answer == question.userAsnwer ? "correct!" : "incorrect!"} </Text>
                        <Button size="sm" isDisabled={!question.isAnswered} onClick={handleNext}>
                          {
                            quizData.currentQuestionIndex == quizData.questions.length - 1 ? "Finish" : "Next"
                          }
                        </Button>
                      </VStack>
                    </Box>
                  )
                })
              }

              {
                quizData.isEnded && (
                  <VStack h="200px">
                    <Text> Quiz Ended</Text>
                    <Text> Correct Answers: {quizData.corretAnswers} </Text>
                    <Text> Incorrect Answers: {quizData.incorrectAnswers} </Text>
                  </VStack>
                )
              }

            </Box>


          </ModalBody>

          {/* <ModalFooter>
            <Button size="sm">
               Next
            </Button>
          </ModalFooter> */}

        </ModalContent>
      </Modal>
    </>
  )
}

export default QuizModal