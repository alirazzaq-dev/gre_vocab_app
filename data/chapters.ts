import { 
    chapter1, chapter2, chapter3, chapter4, chapter5, chapter6, 
    chapter7, chapter8, chapter9, chapter10, chapter11, chapter12, 
} from "./chaptersData";

export type Chapter = {words: Word[], passages: Passage[]};

export type Word = {
    "word": string,
    "definition": string,
    "urduMeaning": string,
    "exampleSentences": string[]
}

export type Passage = {
    title: string;
    passage: string;
}

export const chapters: Chapter[] = [
    {...chapter1, words: chapter1.words.slice(0, 5)},
    chapter1,
    chapter2,
    chapter3,
    chapter4,
    chapter5, chapter6,
    chapter7, chapter8,
    chapter9, chapter10,
    chapter11, chapter12,

]