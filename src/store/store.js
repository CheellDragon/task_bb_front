import axios from '../axios/api';
import {configureStore} from "@reduxjs/toolkit";
import requestsSlice from './services/requestsSlice';
import usersSlice from './services/usersSlice';

const localStorageMiddleware = ({getState}) => next => action => {
    const result = next(action);
    localStorage.setItem('user', JSON.stringify(getState().users.user));
    return result;
};

const loadFromLocalStorage = () => {
    if(localStorage.getItem('user') !== null) {
        return {users: {user: JSON.parse(localStorage.getItem('user'))}}
    }
    return undefined;
}

const store = configureStore({
    reducer: {
        users: usersSlice,
        requests: requestsSlice,
    },
    preloadedState: loadFromLocalStorage(),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware)
})

axios.interceptors.request.use(config => {
    try {
        config.headers['Authorization'] = store.getState().users.user.token;
    } catch (e){}
    return config;
});

export default store;
