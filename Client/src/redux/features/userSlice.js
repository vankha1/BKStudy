import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        value: {
            userId: '',
            userType: '',
            email: '',
            avatar: '',
            fullname: '',
            dateOfBirth: '',
            joinedDate: '',
            phoneNumber: ''
        }   
    },
    reducers: {
        userInformation: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {  userInformation } = userSlice.actions;
export default userSlice.reducer;