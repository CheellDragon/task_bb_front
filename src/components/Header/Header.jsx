import React from "react";
import "./Header.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

const Header = ({isAuthorized, signNav, registerNav, openSideBar, isSideBarOpen, currentPage}) => {
    if(currentPage === '/register') {
        currentPage = true;
    } else {
        currentPage = false;
    }
    return (
        <AppBar position="static" color="transparent">
            <Toolbar className="header">
                {
                    isAuthorized ?
                    <IconButton
                        onClick={openSideBar}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        className="burger"
                    >
                        {
                            isSideBarOpen 
                            ? <CloseIcon/>
                            : <MenuIcon />
                        }
                    </IconButton>
                    :
                    <div></div>
                }
                <Typography className="logo">Test Dotnet</Typography>
                {
                    currentPage
                    ? <Typography className="authorizationButton" onClick={signNav}>Войти</Typography>
                    : <Typography className="authorizationButton" onClick={registerNav}>Регистрация</Typography>
                }
            </Toolbar>
        </AppBar>
    )
}

export default Header;
