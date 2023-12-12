import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { ISlide } from '../../models'

interface ISlides {
  loading: boolean,
  error: string,
  Slide: ISlide[]|null
}

const initialState:ISlides= {
  loading: false,
  error: "",
  Slide: []
}

export const SlideSlice = createSlice({
  name: 'Slide',
  initialState,
  reducers: {
    fetchingSlide(state) {
      state.loading = true;
    },
    fetchSlide(state, action:PayloadAction<ISlide[]>) {
      state.loading = false;
      state.Slide = action.payload;
      state.error = ''
    },
    fetchErrorSlide(state, action:PayloadAction<Error> ) {
      state.loading = false;
      state.error = action.payload.message
    },
    
  }
})

export const { fetchingSlide, fetchSlide, fetchErrorSlide } = SlideSlice.actions;
export default SlideSlice.reducer;
