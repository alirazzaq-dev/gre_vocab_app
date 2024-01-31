import { Chapter, Word, chapters } from '@/data/chapters';
import { createSlice, current } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface VocabularyApp {
  chapters: Array<Chapter>;
  fontSize: number;
  focusMode: {
    active: boolean;
    index: number;
    isFlipped: boolean;
  },
  selectedWord: Word,
  quizInfo: {
    quizNumber: number;
    quizChapter: Chapter
  }
}

const initialState: VocabularyApp = {
  chapters: chapters,
  fontSize: 20,
  focusMode: {
    active: true,
    index: 0,
    isFlipped: false
  },
  selectedWord: chapters[0].words[0],
  quizInfo: {
    quizNumber: 0,
    quizChapter: chapters[0]
  }
}

export const counterSlice = createSlice({
  name: 'VocabularyApp',
  initialState,
  reducers: {
    setFontSize: (state, action: PayloadAction<number>) => {
      state.fontSize = action.payload
    },
    makeIndexZero: (state) => {
      state.focusMode.index = 0
    },
    changeFocusMode: (state) => {
      state.focusMode.active = !state.focusMode.active;
      state.focusMode.isFlipped = false
    },
    updateFocusModeNext: (state, action: PayloadAction<{ chapterLength: number }>) => {
      if (state.focusMode.index < action.payload.chapterLength - 1) {
        state.focusMode.isFlipped = false
        state.focusMode.index++
      }
    },
    updateFocusModePrevious: (state) => {
      if (state.focusMode.index > 0) {
        state.focusMode.isFlipped = false
        state.focusMode.index--
      }
    },
    updateFocusNext: (state, action: PayloadAction<number>) => {
      state.focusMode.index = action.payload
    },
    updateFocusFlip: (state) => {
      state.focusMode.isFlipped = !state.focusMode.isFlipped;
    },
    shuffleChapter: (state, action: PayloadAction<number>) => {
      const chapterIndex = action.payload - 1;
      let shuffledWords = [...current(state.chapters[chapterIndex].words)];
      for (let i = shuffledWords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
      }
      state.chapters[chapterIndex].words = shuffledWords;
      state.focusMode.index = 0;
      state.focusMode.isFlipped = false
    },
    setSelectedWord: (state, action: PayloadAction<Word>) => {
      state.selectedWord = action.payload;
    },
    updateQuizChapter: (state, action: PayloadAction<{ chapter: Chapter, quizNumber: number }>) => {
      state.quizInfo.quizChapter = action.payload.chapter;
      state.quizInfo.quizNumber = action.payload.quizNumber;
    }
  },

})

// Action creators are generated for each case reducer function
export const {
  setFontSize,
  changeFocusMode,
  shuffleChapter,
  updateFocusModeNext,
  setSelectedWord,
  updateFocusModePrevious,
  updateFocusFlip,
  makeIndexZero,
  updateQuizChapter
} = counterSlice.actions

export default counterSlice.reducer