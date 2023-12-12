import { createSlice,PayloadAction } from '@reduxjs/toolkit'

 import { IContactUS } from '../../models'

interface IContactUSs {
  loading: boolean,
  error: string,
  ContactUs: IContactUS[]
}


const initialState:IContactUSs= {
  loading: false,
  error: "",
  ContactUs: []
}

export const ContactUsSlice = createSlice({
  name: 'ContactUs',
  initialState,
  reducers: {
    fetchingContactUs(state) {
      state.loading = true;
    },
    fetchContactUs(state, action:PayloadAction<IContactUS[]>) {
      state.loading = false;
      state.ContactUs = action.payload;
      state.error = '';
    },
    fetchErrorContactUs(state, action:PayloadAction<Error> ) {
      state.loading = false;
      state.error = action.payload.message;
    },
    
  }
})

export const { fetchingContactUs, fetchContactUs, fetchErrorContactUs } = ContactUsSlice.actions;
export default ContactUsSlice.reducer;
