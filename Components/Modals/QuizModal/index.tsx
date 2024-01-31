import React from 'react'
import { Modal, Text, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, OrderedList, ListItem, Center, Button, VStack, Flex, Divider, FormControl, FormLabel, Switch } from '@chakra-ui/react'
import { capitalize } from '@/utils';
import useQuizHook, { Question } from './useQuizHook';


const QuizModal = ({ isOpen, onClose }:
  {
    isOpen: boolean,
    onClose: () => void;
  }
) => {

  const { quizData, quizInfo, handleAnswer, handleNext, handleStartQuiz } = useQuizHook(isOpen);
  const [showIncorrect, setShowIncorrect] = React.useState(true);

  // console.log("quizData: ", quizData);


  const QuestionWithOptions = ({ question, questionNumber, questionCount }: { question: Question, questionNumber: number, questionCount: number  }) => {
    return (
      <Box>
        <Flex justify="space-between" align="center">
          <Text fontWeight="bold" fontSize="24px"> {question.question} </Text>
          <Text fontSize="12px"> {questionNumber}/{questionCount} </Text>
        </Flex>

        <OrderedList>
          {
            question.options.map((option, index) => {
              return (
                <ListItem
                  userSelect="none"
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
                      question.userAnswer && option == question.answer ? "green.500" :
                        option == question.answer ? "green.300" :
                          question.userAnswer == option ? "red.500" : "transparent"
                  }
                >
                  <Text w="full">
                    {option}
                  </Text>

                </ListItem>
              )
            })
          }
        </OrderedList>

      </Box>
    )
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        // isOpen={true}
        onClose={() => onClose()}
      >
        <ModalOverlay color="green" backdropFilter='blur(15px)' />

        <ModalContent 
          minW={{ base: "300px", lg: "800px" }} 
          minH="300px" 
          maxH="800px" 
          my="auto"
          overflowY="scroll"
        
        >
          <ModalHeader>

            <Box>
              <Text> Quiz # {quizInfo.quizNumber}</Text>
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
                quizData.questions.map((question, index, questions) => {

                  return (
                    <Box border="0px solid red" key={index} hidden={question.id != quizData.currentQuestionIndex}>

                      <QuestionWithOptions question={question} questionNumber={index + 1} questionCount={questions.length} />

                      <br />
                      <VStack m="20px">

                        <Box h="20px">
                          <Text hidden={!question.isAnswered} > {question.answer == question.userAnswer ? "correct!" : "incorrect!"} </Text>
                        </Box>

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
                  <Box>

                    <VStack spacing={0}>
                      <Text> Quiz Ended</Text>
                      <Text> Correct Answers: {quizData.correctAnswers} </Text>
                      <Text> Incorrect Answers: {quizData.incorrectAnswers} </Text>
                    </VStack>

                    <Flex w="full" >
                      <FormControl display='flex' justifyContent="flex-end" alignItems='center'>
                        <FormLabel mb='0' fontSize="12px">
                          Show Only Incorrect
                        </FormLabel>
                        <Switch
                          size="sm"
                          isChecked={showIncorrect}
                          onChange={() => setShowIncorrect(!showIncorrect)}
                        />
                      </FormControl>
                    </Flex>

                    <Box>
                      {
                        quizData.attempts
                        .filter((question) => showIncorrect ? question.answer != question.userAnswer : true)
                        .map((question, index, questions) => {
                          return (
                            <Box key={index} my="12px">
                              <QuestionWithOptions
                                question={question}
                                questionNumber={index + 1}
                                questionCount={questions.length}
                              />
                              <Divider />
                            </Box>
                          )
                        })
                      }
                    </Box>

                  </Box>
                )
              }

            </Box>


          </ModalBody>

        </ModalContent>
      </Modal>
    </>
  )
}

export default QuizModal