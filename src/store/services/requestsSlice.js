import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios/api";

const initialState = {
    requests: [],
    modalShow: false,
};

export const createRequest = createAsyncThunk(
    'requests/create',
    async (payload, thunkApi) => {
        let body = new FormData();
        body.append('fio',payload.userData.fio);
        body.append('phoneNumber',payload.userData.phone);
        body.append('email',payload.userData.email);
        body.append('type',payload.userData.type);
        try {
            await axios.post('http://localhost:5136/Request/AddRequest', body);
            payload.navigate('/status/Заявка успешно создана');
            return null;
        } catch (e) {
            payload.navigate('/status/' + e.message);
            return null;
        }
    }
)
const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
    },
    extraReducers:  {}
})
export const {modalShow, modalClose} = requestsSlice.actions;
export default requestsSlice.reducer;
