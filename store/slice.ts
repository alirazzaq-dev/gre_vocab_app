import { Chapter, Word, chapters } from '@/data/words';
import { createSlice, current } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface VocabularyApp {
  chapters: Array<Chapter>;
  fontSize: number;
  focusMode: {
    visible: boolean;
    index: number;
  },
  selectedWord: Word,

}

const initialState: VocabularyApp = {
  chapters: chapters,
  fontSize: 20,
  focusMode: {
    visible: false,
    index: 0,
  },
  selectedWord: chapters[0][0],

}

export const counterSlice = createSlice({
  name: 'Vocabulary App',
  initialState,
  reducers: {
    setFontSize: (state, action: PayloadAction<number>) => {
      state.fontSize = action.payload
    },
    changeFocusMode: (state) => {
      state.focusMode = { visible: !state.focusMode.visible, index: 0 }
    },
    updateFocusModeNext: (state) => {
      state.focusMode.index++
    },
    updateFocusNext: (state, action: PayloadAction<number>) => {
      state.focusMode.index = action.payload
    },
    shuffleChapter: (state, action: PayloadAction<number>) => {
      const chapterIndex = action.payload - 1;
      let shuffledChapter = [...current(state.chapters[chapterIndex])];
      for (let i = shuffledChapter.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledChapter[i], shuffledChapter[j]] = [shuffledChapter[j], shuffledChapter[i]];
      }
      state.chapters[chapterIndex] = shuffledChapter;
    },
    setSelectedWord: (state, action: PayloadAction<Word>) => {
      state.selectedWord = action.payload;
    }

  },
})

// Action creators are generated for each case reducer function
export const { setFontSize, changeFocusMode, shuffleChapter, updateFocusModeNext, setSelectedWord } = counterSlice.actions

export default counterSlice.reducer