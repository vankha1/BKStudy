import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userInformation: (state, action) => {
            state.value = action.payload;
        },
        reset: () => initialState.value
    }
})

export const {  userInformation, reset } = userSlice.actions;
export default userSlice.reducer;