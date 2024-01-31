import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Chapter, Word } from '@/data/chapters';
// import shuffle from 'shuffle-array'; // You may need to install a library for shuffling
import arrayShuffle from 'array-shuffle';

export type Question = {
  id: number;
  question: string;
  answer: string;
  options: string[];
  isAnswered: boolean;
  userAnswer: string
}

type QuizData = {
  isInProgress: boolean,
  isEnded: boolean,
  currentQuestionIndex: number,
  correctAnswers: number,
  incorrectAnswers: number,
  questions: Question[]
  attempts: Question[]
}


// function createQuizFromChapter(chapter: Chapter): QuizData {
//   // Shuffle the words to randomize the order of questions
//   const shuffledWords = arrayShuffle(chapter.words);

//   // Create an empty array to store the quiz questions
//   const quizQuestions: Question[] = [];

//   // Create questions for each word in the chapter
//   shuffledWords.forEach((word, index) => {
//     // Generate four different variants of questions for the word
//     const variants = generateQuestionVariants(word);

//     // Shuffle the variants to randomize their order
//     const shuffledVariants = arrayShuffle(variants);

//     // Add the variants to the quizQuestions array
//     shuffledVariants.forEach((variant, variantIndex) => {
//       const question: Question = {
//         id: variantIndex, // Unique question ID
//         question: variant.question,
//         answer: variant.answer,
//         options: variant.options,
//         isAnswered: false,
//         userAnswer: '',
//       };
//       quizQuestions.push(question);
//     });
//   });

//   // Create the QuizData instance
//   const quizData: QuizData = {
//     isInProgress: false, // Set to true when the quiz starts
//     isEnded: false, // Set to true when the quiz ends
//     currentQuestionIndex: 0,
//     correctAnswers: 0,
//     incorrectAnswers: 0,
//     questions: quizQuestions,
//     attempts: [],
//   };

//   return quizData;
// }

// // Helper function to generate four different question variants for a word
// type QuestionVariant = {
//   question: string;
//   answer: string;
//   options: string[];
// }

// function generateQuestionVariants(word: Word): QuestionVariant[] {
//   const variants: QuestionVariant[] = [];

//   // Variant 1: What is the definition of 'word'?
//   variants.push({
//     question: `What is the definition of '${word.word}'?`,
//     answer: word.definition,
//     options: generateOptions([word.definition]),  
//   });

//   // Variant 2: What is the Urdu meaning of 'word'?
//   variants.push({
//     question: `What is the Urdu meaning of '${word.word}'?`,
//     answer: word.urduMeaning,
//     options: generateOptions([word.urduMeaning]),
//   });

//   // Variant 3: Use 'word' in a sentence.
//   variants.push({
//     question: `Use '${word.word}' in a sentence.`,
//     answer: word.exampleSentences[0], // Use the first example sentence as the answer
//     options: generateOptions([word.exampleSentences[0]]),
//   });

//   // Variant 4: What part of speech is 'word'?
//   // You can customize this variant based on your requirements
//   variants.push({
//     question: `What part of speech is '${word.word}'?`,
//     answer: 'Noun', // Replace with the actual part of speech
//     options: generateOptions(['Noun', 'Verb', 'Adjective', 'Adverb']),
//   });

//   return variants;
// }

// // Helper function to generate multiple-choice options
// function generateOptions(answerOptions: string[]): string[] {
//   // You can customize this function to generate distractors if needed
//   return arrayShuffle(answerOptions.concat(['Distractor1', 'Distractor2', 'Distractor3']));
// }


function createQuizFromChapter(chapter: Chapter): QuizData {
  // Shuffle the words to randomize the order of questions
  const shuffledWords = arrayShuffle(chapter.words);

  // Create an empty array to store the quiz questions
  const quizQuestions: Question[] = [];

  // Create questions for each word in the chapter
  shuffledWords.forEach((word, index) => {
    // Generate multiple-choice options for the question
    const options = generateOptions(shuffledWords, word);

    // Create a question for the word
    const question: Question = {
      id: index,
      question: `What is the definition of '${word.word}'?`,
      answer: word.definition,
      options: options,
      isAnswered: false,
      userAnswer: "",
    };

    // Add the question to the quizQuestions array
    quizQuestions.push(question);
  });

  // Create the QuizData instance
  const quizData: QuizData = {
    isInProgress: false, // Set to true when the quiz starts
    isEnded: false, // Set to true when the quiz ends
    currentQuestionIndex: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    questions: quizQuestions,
    attempts: [],
  };

  return quizData;
}

// Helper function to generate multiple-choice options
function generateOptions(words: Word[], correctWord: Word): string[] {
  // Shuffle the words to randomize the order of options
  const shuffledWords = arrayShuffle(words);

  // Include the correct definition as an option
  const options: string[] = [correctWord.definition];

  // Add other random definitions as options
  for (const word of shuffledWords) {
    if (word !== correctWord && options.length < 4) {
      options.push(word.definition);
    }
  }

  // Shuffle the options again to randomize their order
  return arrayShuffle(options);
}


const useQuizHook = (isOpen: boolean) => {

  const quizInfo = (useSelector((state: RootState) => state.quizInfo));
  const [quizData, setQuizData] = useState<QuizData>(createQuizFromChapter(quizInfo.quizChapter))
  // console.log("quizData: ", quizData);

  const handleStartQuiz = () => {
    setQuizData((e) => ({ ...e, isInProgress: true }))
  }

  const handleAnswer = (questionId: number, answer: string) => {

    const queston = quizData.questions.find((e) => e.id == questionId) as Question;
    if(queston.isAnswered) return;
    
    setQuizData((data) => {
      let answerObj = { ...queston, isAnswered: true, userAnswer: answer }
      const newData = data.questions.map((question) => {
        if (question.id == questionId && !question.isAnswered) {
          return { ...question, isAnswered: true, userAnswer: answer };
        }
        return question
      })
      return { ...data, questions: newData, attempts: [...data.attempts, answerObj] } as QuizData;
    })

    

    queston.answer == answer ?
      setQuizData((e) => ({
        ...e,
        correctAnswers: e.correctAnswers + 1,
        // attempts: [answer, ...e.attempts],
      })) :
      setQuizData((e) => ({ ...e, incorrectAnswers: e.incorrectAnswers + 1 }))
    

  }

  const handleNext = () => {
    setQuizData((e) => ({ ...e, currentQuestionIndex: e.currentQuestionIndex + 1 }))

    if (quizData.currentQuestionIndex == quizData.questions.length - 1) {
      setQuizData((e) => ({ ...e, isEnded: true }))
    }
  }

  useEffect(() => {
    setQuizData(createQuizFromChapter(quizInfo.quizChapter));
  }, [isOpen])

  return {
    quizInfo,
    quizData,
    handleStartQuiz,
    handleAnswer,
    handleNext
  }

}

export default useQuizHook