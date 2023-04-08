import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './UserMenu.css';

export default function UserMenu({userName,logoutU}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutHandleClose = () => {
    logoutU()
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="UserMenu_button"
        className='UserMenu_button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {userName}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{ mt: 1 }}
      >
        <MenuItem onClick={logoutHandleClose}>Выйти</MenuItem>
      </Menu>
    </div>
  );
}
