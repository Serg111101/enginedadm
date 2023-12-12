import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { IQuiz } from '../../models'

interface IQuizSatelite {
  loading: boolean,
  error: string,
  QuizSatelite: IQuiz[]
}

const initialState:IQuizSatelite= {
  loading: false,
  error: "",
  QuizSatelite: []
}

export const QuizSateliteSlice = createSlice({
  name: 'QuizSatelite',
  initialState,
  reducers: {
    fetchingQuizSatelite(state) {
      state.loading = true;
    },
    fetchQuizSatelite(state, action:PayloadAction<IQuiz[]>) {
      state.loading = false;
      state.QuizSatelite = action.payload;
      state.error = ''
    },
    fetchErrorQuizSatelite(state, action:PayloadAction<Error> ) {
      state.loading = false;
      state.error = action.payload.message
    },
    
  }
})

export const { fetchingQuizSatelite, fetchQuizSatelite, fetchErrorQuizSatelite } = QuizSateliteSlice.actions;
export default QuizSateliteSlice.reducer;
