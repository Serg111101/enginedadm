import { createSlice,PayloadAction } from '@reduxjs/toolkit';
// import { IHomeNextRout } from '../../models';


interface IImage {
  loading: boolean,
  error: string,
  Image: any,
}

const initialState:IImage= {
  loading: false,
  error: "",
  Image:[],
}

export const ImageSlice = createSlice({
  name: 'Image',
  initialState,
  reducers: {
    fetchingImage(state) {
      state.loading = true;
    },
    fetchImage(state, action:PayloadAction<IImage>) {
      state.loading = false;
      state.Image = action.payload;
      state.error = ''
    },
    fetchErrorImage(state, action:PayloadAction<Error> ) {
      state.loading = false;
      state.error = action.payload.message
    },
    
  }
})

export const { fetchingImage, fetchImage, fetchErrorImage } = ImageSlice.actions


export default ImageSlice.reducer
