import React from "react";
import "./Header.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from "@mui/material";
import UserMenu from "./UserMenu/UserMenu";

const Header = ({isAuthorized, signNav, registerNav, openSideBar, isSideBarOpen, currentPage, user, logoutU}) => {
    if(currentPage === '/register') {
        currentPage = true;
    } else {
        currentPage = false;
    }
    return (
        <AppBar position="static" color="success">
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
                    !!user ?
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <UserMenu userName={`${user.fio}`} logoutU={logoutU}/>
                    </Box>
                    
                    : currentPage
                        ? <Typography className="authorizationButton" sx={{ border: "1px solid white" }} onClick={signNav}>Войти</Typography>
                        : <Typography className="authorizationButton" sx={{ border: "1px solid white" }} onClick={registerNav}>Регистрация</Typography>
                }
            </Toolbar>
        </AppBar>
    )
}

export default Header;
