import React from 'react';
import './Navigation.css';
import Header from '../../components/Header/Header';
import { useState } from "react";
import SideBar from '../../components/SideBar/SideBar';
import { useNavigate } from "react-router-dom";
import {CssBaseline} from "@mui/material";
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Navigation = (user) => {
    // Если Клиент не вошел в аккаунт не показывать функционал
    const isAuthorized = true;// make from user
    const [isSideBarOpen,setIsSideBarOpen] = useState(false);
    // Считать где находится пользователь если клиент в регистраций то кнопку Войти и наоборот
    const currentPage = useLocation().pathname;
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
    return (
    <>
        <CssBaseline/>
        <nav className="nav">
            <Header isAuthorized={isAuthorized} openSideBar={openSideBar} registerNav={registerNav} signNav={signNav} isSideBarOpen={isSideBarOpen} currentPage={currentPage}/>
            {
                isSideBarOpen 
                ? <SideBar close={"sideBarOpen"}/>
                : <SideBar close={"sideBarClose"}/>
            }
        </nav>
        
        {
            isSideBarOpen 
            ? <div className='container mr180'><Outlet /></div>
            : <div className='container'><Outlet /></div>
        }
    </>
    )
}

export default Navigation;
