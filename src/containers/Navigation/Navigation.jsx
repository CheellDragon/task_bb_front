import React, { useEffect } from 'react';
import './Navigation.css';
import Header from '../../components/Header/Header';
import { useState } from "react";
import SideBar from '../../components/SideBar/SideBar';
import { useNavigate } from "react-router-dom";
import {CssBaseline} from "@mui/material";
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/services/usersSlice';
import { useSelector } from 'react-redux';
import Ding from '../../components/Ding/Ding'
const Navigation = () => {
    // Если Клиент не вошел в аккаунт не показывать функционал
    const { user,status } = useSelector(state => state.users);
    const { reqStatus } = useSelector(state => state.requests);
    const isAuthorized = !!user;
    const [isSideBarOpen,setIsSideBarOpen] = useState(false);
    // Считать где находится пользователь если клиент в регистраций то кнопку Войти и наоборот
    const currentPage = useLocation().pathname;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if(!!user) {
            setIsSideBarOpen(true);
        } else {
            setIsSideBarOpen(false);
        }
    },[user])
    const openSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen);
    }
    const signNav = () => {
        navigate("/")
    }
    const registerNav = () => {
        navigate("/register")
    }
    const createNav = () => {
        navigate("/create")
    }
    const requestsNav = () => {
        navigate("/requests")
    }
    const historyNav = () => {
        navigate("/history")
    }
    const logoutU = () => {
        dispatch(logoutUser({
            UserData: "d",
            navigate
        }))
    }
    return (
    <>
        <CssBaseline/>
        <nav className="nav">
            <Header
                user={user}
                isAuthorized={isAuthorized}
                openSideBar={openSideBar}
                registerNav={registerNav}
                signNav={signNav}
                isSideBarOpen={isSideBarOpen}
                currentPage={currentPage}
                logoutU={logoutU}
            />
            {
                isSideBarOpen 
                ? <SideBar createNav={createNav} requestsNav={requestsNav} historyNav={historyNav} close={"sideBarOpen"}/>
                : <SideBar/>
            }
        </nav>
        {
            !status 
            ? <Ding message={status} type="success"/>
            : !reqStatus
                ? <Ding message={reqStatus} type="Error"/>
                : null
        }
        {
            isSideBarOpen 
            ? <div className='container mr200'><Outlet /></div>
            : <div className='container'><Outlet /></div>
        }
    </>
    )
}

export default Navigation;
