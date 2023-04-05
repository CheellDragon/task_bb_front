import React from 'react';
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

const Navigation = () => {
    // Если Клиент не вошел в аккаунт не показывать функционал
    const {user} = useSelector(state => state.users);
    const isAuthorized = !!user;
    const [isSideBarOpen,setIsSideBarOpen] = useState(false);
    // Считать где находится пользователь если клиент в регистраций то кнопку Войти и наоборот
    const currentPage = useLocation().pathname;
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
            isSideBarOpen 
            ? <div className='container mr200'><Outlet /></div>
            : <div className='container'><Outlet /></div>
        }
    </>
    )
}

export default Navigation;
