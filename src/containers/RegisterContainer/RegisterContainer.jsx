import Register from "../../components/Register/Register";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { registerUser } from "../../store/services/usersSlice";
import { useNavigate } from "react-router-dom";

const RegisterContainer = () => {
    const [state,setState] = useState({
        name: '',
        phoneNumber: '',
        password: '',
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitFormHandler = e => {
        dispatch(registerUser({
            userData: {...state},
            navigate
        }))
    };
    const nameHandler = (e) => {
        setState({
            ...state,
            name: e.target.value,
        })
    };
    const passwordHandler = (e) => {
        setState({
            ...state,
            password: e.target.value,
        })
    };
    const phoneHandler = (e) => {
        setState({
            ...state,
            phoneNumber: e.target.value,
        })
    };
    return (
        <Register 
            submitFormHandler={submitFormHandler}
            nameHandler={nameHandler}
            passwordHandler={passwordHandler}
            phoneHandler={phoneHandler}
        />
    )
};

export default RegisterContainer;
