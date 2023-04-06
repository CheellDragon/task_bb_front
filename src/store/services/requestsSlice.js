import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios/api";

const initialState = {
    requests: null,
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

export const addRequestToUser = createAsyncThunk(
    'requests/addRequestToUser',
    async (payload, thunkApi) => {
        let body = new FormData();
        body.append('Id',payload.userData.Id);
        body.append('UserId',payload.userData.UserId);
        try {
            const response = await axios.post('http://localhost:5136/Request/AddRequestToUser', body);
            return response.data;
        } catch (e) {
            payload.navigate('/status/' + e.message);
            return null;
        }
    }
)

export const getMyRequests = createAsyncThunk(
    'requests/getMy',
    async (payload, thunkApi) => {
        try {
            const response = await axios.get(`http://localhost:5136/Request/GetMyRequests?userId=${payload.id}`);
            return response.data;
        } catch (e) {
            payload.navigate('/status/' + e.message);
            return null;
        }
    }
)

export const getAllRequests = createAsyncThunk(
    'requests/getAll',
    async (payload, thunkApi) => {
        try {
            const response = await axios.get('http://localhost:5136/Request/GetAllRequests');
            return response.data;
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
    extraReducers:  builder => {
        builder
            .addCase(getMyRequests.pending, (state) => {
                state.modalShow = true
            })
            .addCase(getMyRequests.rejected, (state) => {
                state.modalShow = false
                state.requests = null
            })
            .addCase(getMyRequests.fulfilled, (state, action) => {
                state.modalShow = false
                state.requests = action.payload
            })
            .addCase(getAllRequests.pending, (state) => {
                state.modalShow = true
            })
            .addCase(getAllRequests.rejected, (state) => {
                state.modalShow = false
                state.requests = null
            })
            .addCase(getAllRequests.fulfilled, (state, action) => {
                state.modalShow = false
                state.requests = action.payload
            })
    }
});
export const {modalShow, modalClose} = requestsSlice.actions;
export default requestsSlice.reducer;
