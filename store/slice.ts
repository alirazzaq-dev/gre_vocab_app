import { Chapter, Word, chapters } from '@/data/words';
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// const sleep = (ms: number) => {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

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
  selectedWord: chapters[0].words[0],
  // tooltip: {
  //   visible: false,
  //   index: 0,
  // }
}

// const sleeping = createAsyncThunk('VocabularyApp/sleep', async (wordIndex: number) => {
//   const response = await sleep(3000);
//   return response;
// }
// )


export const counterSlice = createSlice({
  name: 'VocabularyApp',
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
      let shuffledChapter = [...current(state.chapters[chapterIndex].words)];
      for (let i = shuffledChapter.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledChapter[i], shuffledChapter[j]] = [shuffledChapter[j], shuffledChapter[i]];
      }
      state.chapters[chapterIndex].words = shuffledChapter;
    },
    setSelectedWord: (state, action: PayloadAction<Word>) => {
      state.selectedWord = action.payload;
    },
    // showTooltip: (state, action: PayloadAction<number>) => {
    //       console.log("awaked")
    //       state.tooltip.visible = true;
    //       state.tooltip.index = action.payload;
    // },
    // hideTooltip: (state) => {
    //   state.tooltip.visible = false;
    //   state.tooltip.index = 0;
    // }

  },
  //   extraReducers: (builder) => {
  //     // Add reducers for additional action types here, and handle loading state as needed
  //     builder.addCase(sleeping.fulfilled, (state, action) => {
  //       // Add user to the state array
  //       state.tooltip.visible = true;
  //       state.tooltip.index = action.payload;
  // })
  //   },

})

// Action creators are generated for each case reducer function
export const { setFontSize, changeFocusMode, shuffleChapter, updateFocusModeNext, setSelectedWord } = counterSlice.actions

export default counterSlice.reducer