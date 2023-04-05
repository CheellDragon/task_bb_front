import Authorization from "../../components/Authorization/Authorization";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { loginUser } from "../../store/services/usersSlice";
import { useNavigate } from "react-router-dom";

const AuthorizationContainer = ({user}) => {
    const [state,setState] = useState({
        phone: '',
        password: '',
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitFormHandler = e => {
        e.preventDefault();
        dispatch(loginUser({
            userData: {...state},
            navigate
        }))
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
            phone: e.target.value,
        })
    };
    return (
        <Authorization  submitFormHandler={submitFormHandler} passwordHandler={passwordHandler} phoneHandler={phoneHandler}/>
    )
};

export default AuthorizationContainer;
