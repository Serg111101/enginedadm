import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import {ILinksSuperAdmin} from "../../models/"
interface ILinksSuperAdmins {
  loading: boolean,
  error: string,
  LinksSuperAdmin: ILinksSuperAdmin[]
}

const initialState:ILinksSuperAdmins= {
  loading: false,
  error: "",
  LinksSuperAdmin: []
}

export const LinksSuperAdminSlice = createSlice({
  name: 'LinksSuperAdmin',
  initialState,
  reducers: {
    fetchingLinksSuperAdmin(state) {
      state.loading = true;
    },
    fetchLinksSuperAdmin(state, action:PayloadAction<ILinksSuperAdmin[]>) {
      state.loading = false;
      state.LinksSuperAdmin = action.payload;
      state.error = ''
    },
    fetchErrorLinksSuperAdmin(state, action:PayloadAction<Error> ) {
      state.loading = false;
      state.error = action.payload.message
    },
    
  }
})

export const { fetchingLinksSuperAdmin, fetchLinksSuperAdmin, fetchErrorLinksSuperAdmin } = LinksSuperAdminSlice.actions;
export default LinksSuperAdminSlice.reducer;
