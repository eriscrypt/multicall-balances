import { createSlice } from '@reduxjs/toolkit'

interface UserState {
  selectedWallet?: any
}

const initialState: UserState = {
  selectedWallet: undefined,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateSelectedWallet(state, { payload: { wallet } }) {
      state.selectedWallet = wallet
    },
  },
})

export const { updateSelectedWallet } = userSlice.actions
export default userSlice.reducer
