import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios/api";

const initialState = {
    user: null,
    error: null
}

export const loginUser = createAsyncThunk(
    'users/login',
    async (payload, thunkApi) => {
        try {
            const res = await axios.get('http://localhost:5136/User/Login?PhoneNumber=' + payload.userData.phone + '&Password=' + payload.userData.password);
            payload.navigate('/create');
            return res.data;
        } catch (e) {
            payload.navigate('/status/' + e.message);
            return null;
        }
    }
)

export const registerUser = createAsyncThunk(
    'users/register',
    async (payload, thunkApi) => {
        let body = new FormData();
        body.append('name',payload.userData.name);
        body.append('phoneNumber',payload.userData.phoneNumber);
        body.append('password',payload.userData.password);
        try {
            const res = await axios.post("http://localhost:5136/User/RegisterNewUser", body);
            payload.navigate('/status/Успешная регистрация для пользователя - ' + payload.userData.name + '! Ваш логин: ' + payload.userData.phoneNumber);
            return res.data;
        } catch (e) {
            payload.navigate('/status/' + e.message);
            return null;
        }
    }
)

export const logoutUser = createAsyncThunk(
    'users/logout',
    async (payload, thunkApi) => {
        try {
            const res = await axios.get('http://localhost:5136/Request/GetRequest?Id=1000');
            payload.navigate('/');
            return res.data;
        } catch (e) {}
    }
)


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                if(action.payload !== null) {state.user = action.payload;}
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
            })
    }
})

export default usersSlice.reducer;
