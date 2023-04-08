import { Button,Box } from "@mui/material";
import RequestsTable from "./RequestsTable/RequestsTable";
import './Requests.css';

const Requests = ({getingMyRequest,getingAllRequest,requests,addingToUserHandler, cancellingRequestsHandler, removingFromUserHandler, closingRequestsHandler,removingRequest}) => {
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
                    ? <RequestsTable 
                        rows={requests}
                        addingToUserHandler={addingToUserHandler}
                        cancellingRequestsHandler={cancellingRequestsHandler}
                        removingFromUserHandler={removingFromUserHandler}
                        closingRequestsHandler={closingRequestsHandler}
                        removingRequest={removingRequest}
                    />
                    : <p>Заявок на данный момент нет</p>
            }
        </>
    )
};

export default Requests;
