import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { IQuiz } from '../../models'

interface IQuizs {
  loading: boolean,
  error: string,
  Quiz: IQuiz[]
}

const initialState:IQuizs= {
  loading: false,
  error: "",
  Quiz: []
}

export const QuizSlice = createSlice({
  name: 'Quiz',
  initialState,
  reducers: {
    fetchingQuiz(state) {
      state.loading = true;
    },
    fetchQuiz(state, action:PayloadAction<IQuiz[]>) {
      state.loading = false;
      state.Quiz = action.payload;
      state.error = ''
    },
    fetchErrorQuiz(state, action:PayloadAction<Error> ) {
      state.loading = false;
      state.error = action.payload.message
    },
    
  }
})

export const { fetchingQuiz, fetchQuiz, fetchErrorQuiz } = QuizSlice.actions;
export default QuizSlice.reducer;
