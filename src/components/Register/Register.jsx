import { Box, TextField, Typography, Button } from '@mui/material';

const Register = ({submitFormHandler,nameHandler,passwordHandler,phoneHandler}) => {
    return (
        <div className='form'>
            <div className="formContainer">
                <Typography align="center" sx={{ mb: 2.2, fontSize: "30px" }}>Регистрация</Typography>
                <Box sx={{ display: "flex",flexDirection: "column", alignItems: "center",mb: 2.2  }}>
                    <TextField
                    id="filled-required-name"
                    label="Введите ваше имя"
                    defaultValue=""
                    sx={{mb: 2.2}}
                    onChange={nameHandler}
                    />
                    <TextField
                    id="filled-required-phone-reg"
                    label="Введите ваш номер телефона"
                    defaultValue=""
                    sx={{mb: 2.2}}
                    onChange={phoneHandler}
                    />
                    <TextField
                    id="filled-required-password-reg"
                    label="Введите пароль"
                    type="password"
                    defaultValue=""
                    sx={{mb: 2.2}}
                    onChange={passwordHandler}
                    />
                </Box>
                <Button onClick={submitFormHandler} color="success" variant="contained" sx={{ mb: 2 }}>Зарегистрироваться</Button>
            </div>
        </div>
    )
};

export default Register;
