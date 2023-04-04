import React from "react";
import './SideBar.css';
import { Box,Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import RestorePageIcon from '@mui/icons-material/RestorePage';

const SideBar = ({close, createNav, requestsNav, historyNav}) => {
    return (
        <Box className={close + ' sideBar'}>
            <Box onClick={createNav} className="sideNavLink" sx={{mb: 1.2}}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    className="icon"
                >
                    <CreateNewFolderIcon style={{ color: 'white' }}/>
                </IconButton>
                <Typography>Создать Заявку</Typography>
            </Box>
            <Box onClick={requestsNav} className="sideNavLink" sx={{mb: 1.2}}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="requests"
                    sx={{ mr: 2 }}
                    className="icon"
                >
                    <FeaturedPlayListIcon style={{ color: 'white' }}/>
                </IconButton>
                <Typography>Мои Заявки</Typography>
            </Box>
            <Box onClick={historyNav} className="sideNavLink">
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="history"
                    sx={{ mr: 2 }}
                    className="icon"
                >
                    <RestorePageIcon style={{ color: 'white' }}/>
                </IconButton>
                <Typography>История Заявок</Typography>
            </Box>
        </Box>
    )
}

export default SideBar;
