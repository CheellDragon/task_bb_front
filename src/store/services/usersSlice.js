import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios/api";

const initialState = {
    user: null
}

export const loginUser = createAsyncThunk(
    'users/login',
    async (payload, thunkApi) => {
        try {
            const res = await axios.get('http://localhost:5136/User/Login?PhoneNumber=' + payload.userData.phone + '&Password=' + payload.userData.password);
            payload.navigate('/create');
            return res.data;
        } catch (e) {}
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
        } catch (e) {}
    }
)

export const logoutUser = createAsyncThunk(
    'users/logout',
    async (payload, thunkApi) => {
        try {
            const res = await axios.get('http://localhost:5136/User/Login?PhoneNumber=45&Password=45');
            payload.navigate('/create');
            return res.data;
        } catch (e) {}
    }
)


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.user = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
            })
    }
})

export default usersSlice.reducer;
