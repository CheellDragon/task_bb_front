import { Box, TextField, Typography, RadioGroup, FormControlLabel, Radio, FormLabel, Button } from '@mui/material';
import './Create.css'

const Create = () => {
    return (
        <div className='form'>
            <div className="formContainer">
                <Typography align="center" sx={{ mb: 2.2, fontSize: "30px" }}>Создать Заявку</Typography>
                <Box sx={{ display: "flex",flexDirection: "column", alignItems: "center",mb: 2.2  }}>
                    <TextField
                    id="filled-required"
                    label="Номер Телефона"
                    defaultValue=""
                    sx={{mb: 2.2}}
                    />
                    <TextField
                    id="filled-required"
                    label="ФИО"
                    defaultValue=""
                    sx={{mb: 2.2}}
                    />
                    <TextField
                    id="filled-required"
                    label="электронная почта"
                    defaultValue=""
                    sx={{mb: 2.2}}
                    />
                </Box>
                <FormLabel id="demo-controlled-radio-buttons-group" sx={{ fontSize: "20px" }}>Тип запроса</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    sx={{mb: 2.2}}
                >
                    <FormControlLabel value="Продажа" control={<Radio />} label="Продажа" />
                    <FormControlLabel value="Покупка" control={<Radio />} label="Покупка" />
                    <FormControlLabel value="Аукцион" control={<Radio />} label="Аукцион" />
                </RadioGroup>
                <Button color="success" variant="contained">Добавить Заявку</Button>
            </div>
        </div>
    )
}

export default Create;
