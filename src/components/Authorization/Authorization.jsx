import { Box, TextField, Typography, Button } from '@mui/material';

const Authorization = () => {
    return (
        <div className='form'>
            <div className="formContainer">
                <Typography align="center" sx={{ mb: 2.2, fontSize: "30px" }}>Войти в систему</Typography>
                <Box sx={{ display: "flex",flexDirection: "column", alignItems: "center",mb: 2.2  }}>
                    <TextField
                    id="filled-required"
                    label="Введите номер телефона"
                    defaultValue=""
                    sx={{mb: 2.2}}
                    />
                    <TextField
                    id="filled-required"
                    label="Введите пароль"
                    type="password"
                    defaultValue=""
                    sx={{mb: 2.2}}
                    />
                </Box>
                <Button color="success" variant="contained" sx={{ mb: 2 }}>Войти</Button>
                <Button color="primary" variant="text" sx={{ fontSize: "12px", padding: "5px" }}>Забыли пароль</Button>
            </div>
        </div>
    )
};

export default Authorization;
