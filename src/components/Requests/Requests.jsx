import { Button,Box } from "@mui/material";
import EnhancedTable from "./RequestsTable/RequestsTable";
import './Requests.css';

const Requests = ({getingMyRequest,getingAllRequest,requests}) => {
    return (
        <>
            <Box className="buttons">
                <Button className="button" onClick={getingMyRequest} sx={{mr: 2}} color="success" variant="contained">Получить Свои Заявки</Button>
                <Button onClick={getingAllRequest} color="success" variant="contained">Получить Все Заявки</Button>
            </Box>
            {
                requests === null
                ? null
                : requests.length > 0
                    ? <EnhancedTable/>
                    : <p>Заявок на данный момент нет</p>
            }
        </>
    )
};

export default Requests;
