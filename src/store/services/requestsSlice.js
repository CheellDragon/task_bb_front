import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios/api";

const initialState = {
    requests: null,
    fetching: false,
    requestsHistory: []
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

export const addRequestHistory = createAsyncThunk(
    'requests/addRequestHistory',
    async (payload, thunkApi) => {
        let body = new FormData();
        body.append('requestId',payload.requestId);
        body.append('userId',payload.userId);
        body.append('actionColumn',payload.actionColumn);
        body.append('prevData',payload.prevData);
        body.append('newData',payload.newData);
        try {
            const response = await axios.post('http://localhost:5136/Request/AddRequestHistory', body);
            return response.data;
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

export const removeRequestFromUser = createAsyncThunk(
    'requests/removeRequestFromUser',
    async (payload, thunkApi) => {
        let body = new FormData();
        body.append('Id',payload.Id);
        body.append('UserId',payload.UserId);
        try {
            const response = await axios.post('http://localhost:5136/Request/RemoveRequestFromUser', body);
            return response.data;
        } catch (e) {
            payload.navigate('/status/' + e.message);
            return null;
        }
    }
)

export const removeRequest = createAsyncThunk(
    'requests/removeRequest',
    async (payload, thunkApi) => {
        let body = new FormData();
        body.append('Id',payload.Id);
        try {
            const response = await axios.post('http://localhost:5136/Request/RemoveRequest', body);
            return response.data;
        } catch (e) {
            payload.navigate('/status/' + e.message);
            return null;
        }
    }
)

export const cancelRequest = createAsyncThunk(
    'requests/cancelRequest',
    async (payload, thunkApi) => {
        let body = new FormData();
        body.append('Id',payload.Id);
        try {
            const response = await axios.post('http://localhost:5136/Request/CancelRequest', body);
            return response.data;
        } catch (e) {
            payload.navigate('/status/' + e.message);
            return null;
        }
    }
)


export const closeRequest = createAsyncThunk(
    'requests/closeRequest',
    async (payload, thunkApi) => {
        let body = new FormData();
        body.append('Id',payload.Id);
        try {
            const response = await axios.post('http://localhost:5136/Request/CloseRequest', body);
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
);

export const getAllRequestsHistory = createAsyncThunk(
    'requests/getAllHistory',
    async (payload, thunkApi) => {
        try {
            const response = await axios.get('http://localhost:5136/Request/GetRequestsHistory');
            return response.data.result;
        } catch (e) {
            payload.navigate('/status/' + e.message);
            return null;
        }
    }
);


const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
    },
    extraReducers:  builder => {
        builder
            .addCase(getMyRequests.pending, (state) => {
                state.fetching = true
            })
            .addCase(getMyRequests.rejected, (state) => {
                state.fetching = false
                state.requests = null
            })
            .addCase(getMyRequests.fulfilled, (state, action) => {
                state.fetching = false
                state.requests = action.payload
            })
            .addCase(getAllRequests.pending, (state) => {
                state.fetching = true
            })
            .addCase(getAllRequests.rejected, (state) => {
                state.fetching = false
                state.requests = null
            })
            .addCase(getAllRequests.fulfilled, (state, action) => {
                state.fetching = false
                state.requests = action.payload
            })
            .addCase(getAllRequestsHistory.pending, (state) => {
                state.fetching = true
            })
            .addCase(getAllRequestsHistory.rejected, (state) => {
                state.fetching = false
                state.requestsHistory = []
            })
            .addCase(getAllRequestsHistory.fulfilled, (state, action) => {
                state.fetching = false
                if(action.payload !== null) {
                    state.requestsHistory = action.payload
                }
            })
            .addCase(closeRequest.pending, (state) => {state.fetching = true})
            .addCase(closeRequest.rejected, (state) => {state.fetching = false})
            .addCase(closeRequest.fulfilled, (state) => {state.fetching = false})
            .addCase(cancelRequest.pending, (state) => {state.fetching = true})
            .addCase(cancelRequest.rejected, (state) => {state.fetching = false})
            .addCase(cancelRequest.fulfilled, (state) => {state.fetching = false})
            .addCase(removeRequest.pending, (state) => {state.fetching = true})
            .addCase(removeRequest.rejected, (state) => {state.fetching = false})
            .addCase(removeRequest.fulfilled, (state) => {state.fetching = false})
            .addCase(removeRequestFromUser.pending, (state) => {state.fetching = true})
            .addCase(removeRequestFromUser.rejected, (state) => {state.fetching = false})
            .addCase(removeRequestFromUser.fulfilled, (state) => {state.fetching = false})
            .addCase(addRequestToUser.pending, (state) => {state.fetching = true})
            .addCase(addRequestToUser.rejected, (state) => {state.fetching = false})
            .addCase(addRequestToUser.fulfilled, (state) => {state.fetching = false})
    }
});
export default requestsSlice.reducer;
