import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const Newuserdata = createAsyncThunk('getData', async ({ id }) => {
    const response = await axios.get('http://localhost:2000/users/' + `${id}`);
    const res = await response.data;
    return res;
});

export const AddUserData = createSlice({
    name: 'Adduser',
    initialState: {
        Newuser: [],
        loading: false,
        error: '',
    },
    extraReducers: {
        [Newuserdata.pending]: (state, action) => {
            state.loading = true;
        },
        [Newuserdata.fulfilled]: (state, action) => {
            state.loading = false;
            state.Newuser = [action.payload];
        },
        [Newuserdata.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export default AddUserData.reducer;
