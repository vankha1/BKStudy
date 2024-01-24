import { createSlice } from "@reduxjs/toolkit";

export const conversationSlice = createSlice({
    name: 'conversation',
    initialState:{
        value: {
            id: '',
            senderId: '',
            receiverId: '',
            isOpen: false,
        }   
    },
    reducers: {
        conversationInfo: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {  conversationInfo } = conversationSlice.actions;
export default conversationSlice.reducer;