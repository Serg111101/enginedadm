import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { IContact } from '../../models'

interface IContacts {
  loading: boolean,
  error: string,
  Contact: IContact[]
}

const initialState:IContacts= {
  loading: false,
  error: "",
  Contact: []
}

export const ContactSlice = createSlice({
  name: 'Contact',
  initialState,
  reducers: {
    fetchingContact(state) {
      state.loading = true;
    },
    fetchContact(state, action:PayloadAction<IContact[]>) {
      state.loading = false;
      state.Contact = action.payload;
      state.error = '';
    },
    fetchErrorContact(state, action:PayloadAction<Error> ) {
      state.loading = false;
      state.error = action.payload.message;
    },
    
  }
})

export const { fetchingContact, fetchContact, fetchErrorContact } = ContactSlice.actions;
export default ContactSlice.reducer;
