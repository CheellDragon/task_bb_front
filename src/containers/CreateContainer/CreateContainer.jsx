import Create from '../../components/Create/Create';
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRequest } from '../../store/services/requestsSlice';

const CreateContainer = () => {
    const [state,setState] = useState({
        phone: '',
        fio: '',
        email: '',
        type: 'Sale',
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitFormHandler = e => {
        e.preventDefault();
        dispatch(createRequest({
            userData: {...state},
            navigate
        }))
    };
    const fioHandler = (e) => {
        setState({
            ...state,
            fio: e.target.value,
        })
    };
    const emailHandler = (e) => {
        setState({
            ...state,
            email: e.target.value,
        })
    };
    const typeHandler = (e) => {
        let type = "Sale";
        if(e.target.value === "Покупка") {
            type = "Buy"
        } else if(e.target.value === "Аукцион") {
            type = "Auction"
        }
        setState({
            ...state,
            type,
        })
    };
    const phoneHandler = (e) => {
        setState({
            ...state,
            phone: e.target.value,
        })
    };
    return (
        <Create
            submitFormHandler={submitFormHandler}
            emailHandler={emailHandler}
            typeHandler={typeHandler}
            fioHandler={fioHandler}
            phoneHandler={phoneHandler}
        />
    )
};

export default CreateContainer;
