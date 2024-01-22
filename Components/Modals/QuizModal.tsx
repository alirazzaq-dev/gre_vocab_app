import { Modal, Text, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, HStack, OrderedList, ListItem, Center, ModalFooter, Button, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { updateFocusModeNext } from '@/store/slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import axios from 'axios';
import { playAudio } from '@/utils';
import { Chapter, Word } from '@/data/chapters';

type Question = {
  id: number;
  question: string;
  answer: string;
  options: string[];
  isAnswered: boolean;
  userAsnwer: string
}

type QuizData = {
  isInProgress: boolean,
  isEnded: boolean,
  currentQuestionIndex: number,
  corretAnswers: number,
  incorrectAnswers: number,
  questions: Question[]
}

const questions: Question[] = [
  {
    id: 0,
    question: "Indigenous",
    answer: "native to a particular region or environment; originating or produced in a specific area",
    options: [
      "the quality of being honest and having strong moral principles; the state of being whole and undivided",
      "native to a particular region or environment; originating or produced in a specific area",
      "certain to happen; unavoidable; bound to occur",
      "impossible to differentiate or distinguish; identical or very similar"
    ],
    isAnswered: false,
    userAsnwer: ""
  },
  {
    id: 1,
    question: "Indistinguishable",
    answer: "impossible to differentiate or distinguish; identical or very similar",
    options: [
      "the quality of being honest and having strong moral principles; the state of being whole and undivided",
      "lack of interest, concern, or sympathy; apathy",
      "certain to happen; unavoidable; bound to occur",
      "impossible to differentiate or distinguish; identical or very similar"
    ],
    isAnswered: false,
    userAsnwer: ""
  },
  {
    id: 2,
    question: "Irrelevant",
    answer: "not connected or related to the matter at hand; not applicable",
    options: [
      "not in agreement or harmony; lacking uniformity; contradictory",
      "lack of interest, concern, or sympathy; apathy",
      "not connected or related to the matter at hand; not applicable",
      "impossible to differentiate or distinguish; identical or very similar"
    ],
    isAnswered: false,
    userAsnwer: ""
  }
]

const defaultQuizData: QuizData = {
  isInProgress: false,
  isEnded: false,
  currentQuestionIndex: 0,
  corretAnswers: 0,
  incorrectAnswers: 0,
  questions: questions
}

const words = [
  {
    "word": "Irrelevant",
    "definition": "not connected or related to the matter at hand; not applicable",
    "urduMeaning": "غیر متعلق یا نا موجب",
    "exampleSentences": [
      "The speaker went off-topic and discussed irrelevant issues during the meeting.",
      "When answering exam questions, it's crucial to avoid providing irrelevant information.",
      "In a focused discussion, it's essential to filter out irrelevant details and stay on point."
    ]
  },
  {
    "word": "Inconsistent",
    "definition": "not in agreement or harmony; lacking uniformity; contradictory",
    "urduMeaning": "غیر متفق یا بے ہم آہنگ",
    "exampleSentences": [
      "The company's inconsistent policies led to confusion among employees.",
      "His statements were inconsistent, and he seemed to change his position frequently.",
      "A reliable data set should be consistent in its measurements and observations."
    ]
  },
  {
    "word": "Meticulous",
    "definition": "showing great attention to detail; thorough and precise",
    "urduMeaning": "دقتی یا محنتی",
    "exampleSentences": [
      "The artist was meticulous in every brushstroke, creating a masterpiece.",
      "A meticulous review of the document revealed no errors or omissions.",
      "A meticulous planner, she considered every aspect of the project to ensure success."
    ]
  },
  {
    "word": "Mediocrity",
    "definition": "the state or quality of being mediocre; the condition of being average or ordinary",
    "urduMeaning": "معمولی یا متوسطی",
    "exampleSentences": [
      "The coach was dissatisfied with the team's mediocrity and pushed for improvement.",
      "Striving for excellence is important to avoid settling for mediocrity.",
      "The company's commitment to innovation prevented it from falling into mediocrity in the industry."
    ]
  },
  {
    "word": "Interdependence",
    "definition": "the mutual reliance or reliance of two or more entities on each other",
    "urduMeaning": "تعلق یا تابعداری",
    "exampleSentences": [
      "In a globalized economy, countries often experience interdependence in trade and commerce.",
      "The success of the partnership relied on the interdependence of the two companies.",
      "The ecosystem's health is maintained through the interdependence of its various species."
    ]
  },
  {
    "word": "Indiscernible",
    "definition": "impossible to see or perceive clearly; not distinguishable",
    "urduMeaning": "غیر واضح یا ناقابل پہچان",
    "exampleSentences": [
      "Due to the heavy fog, the distant landmarks became indiscernible.",
      "The details in the painting were so fine that they appeared indiscernible without magnification.",
      "The witness claimed that the culprit's face was indiscernible in the dimly lit room."
    ]
  },
  {
    "word": "Meager",
    "definition": "lacking in quantity or quality; inadequate; insufficient",
    "urduMeaning": "کم یا ضعیف",
    "exampleSentences": [
      "The refugee camp had only meager supplies of food and water.",
      "After weeks of drought, the farmers faced a meager harvest of crops.",
      "His meager salary made it challenging to cover basic living expenses."
    ]
  },
  {
    "word": "Impulse",
    "definition": "a sudden strong desire or urge to act; a spontaneous and impulsive action",
    "urduMeaning": "جذبہ یا تشویش",
    "exampleSentences": [
      "On a whim, she followed her impulse and booked a last-minute flight.",
      "His impulse to help others led him to volunteer at the local community center.",
      "Resisting the impulse to spend impulsively is crucial for financial stability."
    ]
  },
  {
    "word": "Irreverent",
    "definition": "showing a lack of respect, especially towards something considered sacred or holy",
    "urduMeaning": "غیر ادبی یا بے ادب",
    "exampleSentences": [
      "The comedian's irreverent jokes about religious figures offended some audience members.",
      "It is important to avoid making irreverent comments in sensitive situations.",
      "His irreverent attitude towards authority figures often landed him in trouble."
    ]
  },
  {
    "word": "Inventive",
    "definition": "having the ability to create or design new things; creative and innovative",
    "urduMeaning": "تخلیقی یا نیا آغاز",
    "exampleSentences": [
      "The inventor was known for his inventive mind, constantly developing new technologies.",
      "The company encourages its employees to be inventive and propose creative solutions.",
      "In the field of art, being inventive is essential for pushing boundaries and creating original works."
    ]
  },
  {
    "word": "Inconstant",
    "definition": "likely to change or vary; not consistent or reliable",
    "urduMeaning": "تبدیل یا غیر مستقر",
    "exampleSentences": [
      "Her inconstant mood swings made it challenging for others to predict her reactions.",
      "The weather in the region is inconstant, with frequent shifts in temperature and conditions.",
      "Inconstant market trends can affect the success of investment strategies."
    ]
  },
  {
    "word": "Instinctive",
    "definition": "prompted by natural instinct; done without conscious thought",
    "urduMeaning": "فطرتی یا بلا سوچے سمجھے",
    "exampleSentences": [
      "The bird's instinctive migration patterns are guided by the changing seasons.",
      "Her instinctive reaction to danger was to seek shelter and hide.",
      "Instinctive behaviors in animals are often essential for survival in the wild."
    ]
  },
  {
    "word": "Intuitive",
    "definition": "understood or known without the need for conscious reasoning; based on intuition",
    "urduMeaning": "بے آہنگ یا بغیر سوچے",
    "exampleSentences": [
      "Some people have an intuitive understanding of complex concepts without formal training.",
      "Her intuitive decision-making skills allowed her to navigate challenging situations effectively.",
      "The artist's intuitive approach to painting resulted in unique and captivating works."
    ]
  },
  {
    "word": "Menacing",
    "definition": "threatening or suggestive of danger; likely to cause harm or fear",
    "urduMeaning": "خطرناک یا دھمکی",
    "exampleSentences": [
      "The dark clouds and strong winds were menacing signs of an approaching storm.",
      "The aggressive stance of the wild animal appeared menacing to the hikers.",
      "The menacing tone of the letter raised concerns among the recipients."
    ]
  },
  {
    "word": "Irresistible",
    "definition": "too attractive or appealing to be resisted; impossible to refuse or avoid",
    "urduMeaning": "لبھانے والا یا ناقابل مسترد",
    "exampleSentences": [
      "The aroma of fresh-baked cookies was irresistible, drawing everyone to the kitchen.",
      "His charming smile and charisma made him nearly irresistible to those around him.",
      "The offer was so irresistible that customers couldn't resist taking advantage of the discount."
    ]
  },
  {
    "word": "Misconstrue",
    "definition": "to interpret or understand incorrectly; to misinterpret",
    "urduMeaning": "غلط سمجھنا یا ترکیب دینا",
    "exampleSentences": [
      "His comments were misconstrued, leading to unnecessary confusion.",
      "It's important to communicate clearly to avoid the risk of being misconstrued.",
      "The media often misconstrues statements, leading to misinformation."
    ]
  },
  {
    "word": "Mild",
    "definition": "gentle in nature or behavior; not harsh or severe; moderate",
    "urduMeaning": "نرم یا معمولی",
    "exampleSentences": [
      "She had a mild manner and always approached conflicts with a calm demeanor.",
      "The doctor recommended a mild exercise routine for the patient's recovery.",
      "The soup had a mild flavor, pleasing those who preferred less spice."
    ]
  },
  {
    "word": "Ineffable",
    "definition": "too great or extreme to be expressed or described in words; indescribable",
    "urduMeaning": "لفظوں میں نا آئیہ یا نا قابل وضاحت",
    "exampleSentences": [
      "The beauty of the sunset over the mountains was ineffable, leaving the onlookers speechless.",
      "The emotions experienced in that moment were ineffable and beyond verbal expression.",
      "Some spiritual experiences are ineffable and can only be felt on a profound level."
    ]
  },
  {
    "word": "Intrigue",
    "definition": "to arouse curiosity or interest; to fascinate; a secret or underhanded scheme",
    "urduMeaning": "دلچسپی یا کرنسی",
    "exampleSentences": [
      "The mysterious stranger intrigued the townspeople, who wondered about his background.",
      "The plot of the novel was designed to intrigue readers and keep them guessing.",
      "Political intrigues often involve covert actions and manipulative strategies."
    ]
  },
  {
    "word": "Inexplicable",
    "definition": "impossible to explain or understand; unexplainable",
    "urduMeaning": "غیر قابل وضاحت یا سمجھ",
    "exampleSentences": [
      "The sudden disappearance of the artifact remained inexplicable to archaeologists.",
      "Her inexplicable behavior left her friends puzzled and concerned.",
      "The phenomenon was so unusual and unexpected that it seemed inexplicable by current scientific understanding."
    ]
  },
  {
    "word": "Mitigate",
    "definition": "to make less severe, painful, or harsh; to alleviate or lessen",
    "urduMeaning": "کم کرنا یا خفا ہونا",
    "exampleSentences": [
      "Planting trees can help mitigate the effects of climate change by absorbing carbon dioxide.",
      "The doctor prescribed medication to mitigate the patient's pain and discomfort.",
      "Efforts are being made to mitigate the impact of natural disasters through early warning systems."
    ]
  },
  {
    "word": "Metaphor",
    "definition": "a figure of speech in which a word or phrase is applied to an object or action to which it is not literally applicable; a symbolic expression",
    "urduMeaning": "مجازی اظہار یا تشہیر",
    "exampleSentences": [
      "The metaphor 'time is a thief' conveys the idea that time takes away moments and experiences.",
      "In literature, metaphors are often used to enhance the imagery and convey deeper meanings.",
      "The use of metaphors can make complex concepts more accessible and engaging for readers."
    ]
  },
  {
    "word": "Intelligible",
    "definition": "able to be understood or comprehended; clear and coherent",
    "urduMeaning": "قابل سمجھ یا واضح",
    "exampleSentences": [
      "The speaker made an effort to be intelligible, ensuring that the audience could follow the presentation.",
      "The instructions should be written in a way that is intelligible to users of all levels.",
      "In scientific research, findings need to be presented in an intelligible manner for peer review."
    ]
  },
  {
    "word": "Inflammatory",
    "definition": "arousing anger, hostility, or strong emotion; tending to provoke inflammation",
    "urduMeaning": "جذباتی یا آتش فشاں",
    "exampleSentences": [
      "The inflammatory remarks by the politician escalated tensions and fueled public outrage.",
      "Media coverage with inflammatory headlines can contribute to misinformation and conflict.",
      "Inflammatory responses in the body are a natural part of the immune system's defense against infections."
    ]
  },
  {
    "word": "Instability",
    "definition": "the state of being unstable; lack of stability or steadiness",
    "urduMeaning": "عدم استحکام یا پریشانی",
    "exampleSentences": [
      "The political instability in the region led to economic uncertainty and unrest.",
      "The structural instability of the building posed a safety concern for residents.",
      "Financial markets can experience fluctuations and instability due to various factors."
    ]
  },
  {
    "word": "Malleable",
    "definition": "capable of being shaped or molded; adaptable; easily influenced",
    "urduMeaning": "قابل شکل یا مول کرنے والا",
    "exampleSentences": [
      "Gold is a malleable metal that can be hammered into thin sheets.",
      "Her malleable personality allowed her to adapt to different social situations.",
      "Leadership styles should be malleable to accommodate diverse team dynamics."
    ]
  },
  {
    "word": "Improbable",
    "definition": "not likely to happen or be true; unlikely; doubtful",
    "urduMeaning": "ممکنہ نہ یا شکیل",
    "exampleSentences": [
      "The success of their ambitious project seemed improbable given the limited resources.",
      "Winning the lottery is improbable, considering the odds against it.",
      "Despite facing improbable odds, the underdog team managed to secure a victory."
    ]
  },
  {
    "word": "Infer",
    "definition": "to deduce or conclude information from evidence and reasoning; to derive as a conclusion",
    "urduMeaning": "استنباط یا نتیجہ اخذ کرنا",
    "exampleSentences": [
      "From the data provided, scientists can infer trends and patterns in climate change.",
      "By analyzing the witness statements, the detective tried to infer the sequence of events.",
      "One can infer the author's perspective by examining the tone and language used in the text."
    ]
  },
  {
    "word": "Minutiae",
    "definition": "small, precise, or trivial details; minor or insignificant particulars",
    "urduMeaning": "دقیقہ یا مختصر تفصیلات",
    "exampleSentences": [
      "The contract included all the necessary minutiae, ensuring clarity on terms and conditions.",
      "The historian delved into the minutiae of daily life during the historical period.",
      "While some focus on the big picture, others pay attention to the minutiae that shape the overall outcome."
    ]
  },
  {
    "word": "Inaccessible",
    "definition": "difficult or impossible to reach, approach, or obtain; not easily reachable",
    "urduMeaning": "رسائی ممکن نہ ہونے والا",
    "exampleSentences": [
      "The remote mountain village was inaccessible during the winter months due to heavy snowfall.",
      "The confidential files were stored in an inaccessible location to maintain security.",
      "Some areas of the forest remain inaccessible to researchers due to challenging terrain."
    ]
  },
  {
    "word": "Irreversible",
    "definition": "not able to be changed, undone, or reversed; permanent",
    "urduMeaning": "غیر قابل واپسی یا تبدیل",
    "exampleSentences": [
      "The environmental damage caused by pollution may be irreversible.",
      "Some decisions have irreversible consequences, requiring careful consideration.",
      "Medical procedures aim to address issues in a way that is reversible, but some conditions are irreversible."
    ]
  },
  {
    "word": "Mimic",
    "definition": "to imitate or copy the actions, speech, or appearance of someone or something",
    "urduMeaning": "تقلید یا نقل کرنا",
    "exampleSentences": [
      "The actor could mimic the voices of various celebrities with remarkable accuracy.",
      "Some animals use mimicry to imitate more dangerous species and avoid predators.",
      "Her ability to mimic accents made her popular among friends for entertaining impersonations."
    ]
  },
  {
    "word": "Interference",
    "definition": "the action of interfering or getting involved in the affairs or activities of others",
    "urduMeaning": "مداخلت یا مختلف",
    "exampleSentences": [
      "The interference of external factors affected the accuracy of the experiment.",
      "Government interference in the economy can have both positive and negative consequences.",
      "Parents should avoid unnecessary interference in their children's decision-making process."
    ]
  },
  {
    "word": "Melancholy",
    "definition": "a feeling of deep sadness or sorrow; a gloomy state of mind",
    "urduMeaning": "غمگین یا افسردہ",
    "exampleSentences": [
      "The melancholy melody of the music evoked memories of lost love.",
      "She was overcome with melancholy as she walked through the deserted town.",
      "The rainy weather seemed to enhance the melancholy atmosphere of the old cemetery."
    ]
  },
  {
    "word": "Ineffectual",
    "definition": "not producing the desired effect; incapable of achieving the intended result",
    "urduMeaning": "ناکارہ یا بے اثر",
    "exampleSentences": [
      "Despite their efforts, the campaign proved ineffectual in changing public opinion.",
      "The medicine was deemed ineffectual in treating the severe symptoms of the disease.",
      "Ineffectual leadership can lead to a lack of direction and poor decision-making."
    ]
  },
  {
    "word": "Inescapable",
    "definition": "impossible to avoid or evade; inevitable",
    "urduMeaning": "نا گزر",
    "exampleSentences": [
      "The consequences of the decision were inescapable and had a profound impact.",
      "As the storm approached, the inescapable reality of evacuation became clear.",
      "Inescapable truths often require facing difficult realities and making tough choices."
    ]
  },
  {
    "word": "Mantle",
    "definition": "a loose sleeveless cloak or shawl; a layer or covering that envelops or surrounds",
    "urduMeaning": "لباس یا چادر",
    "exampleSentences": [
      "She wore a flowing mantle to protect herself from the chilly evening breeze.",
      "The Earth's mantle is a layer beneath the crust that plays a crucial role in geological processes.",
      "The artist used a mantle of fog to create a mysterious atmosphere in the painting."
    ]
  },
  {
    "word": "Maligned",
    "definition": "spoken ill of; criticized or slandered; unfairly accused",
    "urduMeaning": "بدنام یا ملامت یافتہ",
    "exampleSentences": [
      "Despite her good intentions, the politician was often maligned by her opponents.",
      "The novel was maligned by some critics, but readers found it to be a compelling story.",
      "Public figures are often maligned in the media, facing scrutiny and negative portrayals."
    ]
  },
  {
    "word": "Impregnable",
    "definition": "unable to be captured or entered by force; unconquerable",
    "urduMeaning": "غیر قابل حملہ یا فتح",
    "exampleSentences": [
      "The ancient fortress was considered impregnable due to its strategic location and strong defenses.",
      "The encryption system was designed to be impregnable to cyber attacks.",
      "The general believed that the mountainous terrain made the position impregnable against enemy forces."
    ]
  },
  {
    "word": "Indispensable",
    "definition": "absolutely necessary or essential; cannot be done without",
    "urduMeaning": "لائق یا بہت ضروری",
    "exampleSentences": [
      "Communication skills are indispensable in today's interconnected world.",
      "In a crisis, teamwork becomes indispensable for achieving a common goal.",
      "The expert's advice proved to be indispensable in solving the complex problem."
    ]
  },
  {
    "word": "Lucrative",
    "definition": "producing a great deal of profit; financially rewarding",
    "urduMeaning": "منافع دہ یا منافع بخش",
    "exampleSentences": [
      "Investing in real estate can be a lucrative business if done wisely.",
      "The entrepreneur discovered a lucrative market niche for handmade artisanal products.",
      "Career opportunities in technology can be highly lucrative due to the demand for skilled professionals."
    ]
  },
  {
    "word": "Lucid",
    "definition": "clearly expressed and easily understood; mentally sound and rational",
    "urduMeaning": "واضح یا دانائی",
    "exampleSentences": [
      "The professor delivered a lucid explanation of the complex scientific concept.",
      "Even in stressful situations, she remained calm and lucid in her decision-making.",
      "A well-organized presentation with lucid visuals enhances audience comprehension."
    ]
  },
  {
    "word": "Manifest",
    "definition": "clear and obvious to the eye or mind; to display or show plainly",
    "urduMeaning": "واضح یا ظاہر ہونا",
    "exampleSentences": [
      "The symptoms of the disease began to manifest themselves after a few days.",
      "The artist's talent manifested in the vibrant colors and intricate details of the painting.",
      "The company's commitment to sustainability is manifest in its eco-friendly practices."
    ]
  },
  {
    "word": "Marginal",
    "definition": "relating to or situated at the edge or margin; minor or insignificant",
    "urduMeaning": "سرحدی یا حاشیہ وار",
    "exampleSentences": [
      "The species thrives in marginal habitats, adapting to extreme conditions.",
      "The impact of the new policy on the economy is expected to be marginal.",
      "She made only marginal improvements to the existing design."
    ]
  },
  {
    "word": "Indulge",
    "definition": "to give in to desires or wishes; to allow oneself to enjoy something",
    "urduMeaning": "شوقین یا خوشی",
    "exampleSentences": [
      "After a week of hard work, she decided to indulge in a relaxing spa day.",
      "It's okay to indulge in occasional treats, but moderation is key for a healthy lifestyle.",
      "He would often indulge his curiosity by exploring new places and trying different cuisines."
    ]
  }
]

const QuizModal = ({ isOpen, onClose }:
  {
    isOpen: boolean,
    onClose: () => void;
  }
) => {

  const quiz = (useSelector((state: RootState) => state.quiz));
  const [quizData, setQuizData] = useState<QuizData>(defaultQuizData)

  const handleStartQuiz = () => {
    setQuizData((e) => ({ ...e, isInProgress: true }))
  }

  const handleAnswer = (questionId: number, answer: string) => {

    setQuizData((data) => {

      const newData = data.questions.map((question) => {
        if (question.id == questionId) {
          return { ...question, isAnswered: true, userAsnwer: answer }
        }
        return question
      })

      return { ...data, questions: newData } as QuizData;
    
    })

    const newCurrentQuestionIndex = quizData.currentQuestionIndex + 1;
    const queston = quizData.questions.find((e) => e.id == questionId) as Question;

    // currentQuestionIndex: newCurrentQuestionIndex

    queston.answer == answer ?
      setQuizData((e) => ({ ...e, corretAnswers: e.corretAnswers + 1,})) :
      setQuizData((e) => ({ ...e, incorrectAnswers: e.incorrectAnswers + 1 }))



  }

  const handleNext = () => {
    setQuizData((e) => ({ ...e, currentQuestionIndex: e.currentQuestionIndex + 1 }))

    if(quizData.currentQuestionIndex == quizData.questions.length - 1) {
      setQuizData((e) => ({ ...e, isEnded: true }))
    }
  }


  useEffect(() => {
    setQuizData(defaultQuizData);
  }, [isOpen])

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
              {/* <Text> questions: {quiz.quizChapter?.words.length} </Text> */}
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
                    <Box border="1px solid red" key={index} hidden={question.id != quizData.currentQuestionIndex}>
                      <Text> Q:{index + 1}/{quizData.questions.length}: {question.question} </Text>
                      {
                        question.options.map((option, index) => {
                          return (
                            <Box>
                              <Button
                                key={index}
                                my="10px"
                                overflowWrap="break-word"
                                display="block"
                                onClick={() => handleAnswer(question.id, option)}
                                bgColor={
                                  // !question.isAnswered ?  "gray.500" :
                                  question.isAnswered && question.answer == option ? "green.500" : "gray.500"
                                }
                              >
                                <Text w="full">
                                  {index + 1}: {option}
                                </Text>
                                
                              </Button>
                            </Box>
                          )
                        })
                      }

                      <br />
                      <VStack hidden={!question.isAnswered}>
                        <Text> {question.answer == question.userAsnwer ? "correct": "incorrect"} </Text>
                        <Button size="sm" onClick={handleNext}> Next </Button>
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