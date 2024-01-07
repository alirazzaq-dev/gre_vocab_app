import { chapter1, chapter2 } from "./chapter1";

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
    chapter1,
    chapter2
]