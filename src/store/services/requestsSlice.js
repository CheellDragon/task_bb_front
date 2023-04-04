import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
// import axios from "../../axios/api";

const initialState = {
    requests: [],
    modalShow: false,
};

export const createRequest = createAsyncThunk(
    'photos/create',
    async(payload) => {
        return null;
    }
)
const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
    },
    extraReducers: {
    }
})
export const {modalShow, modalClose} = requestsSlice.actions;
export default requestsSlice.reducer;
