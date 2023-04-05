import Requests from "../../components/Requests/Requests";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { getMyRequests,getAllRequests } from '../../store/services/requestsSlice';

const RequestsContainer = () => {
    const {user} = useSelector(state => state.users);
    const {requests} = useSelector(state => state.requests);
    const dispatch = useDispatch();
    useEffect(() => {
        // dispatch(getMyRequests(user.id))
    },[])
    const getingMyRequest = () => {
        dispatch(getMyRequests(user.id))
    }
    const getingAllRequest = () => {
        dispatch(getAllRequests(user.id))
    }
    return (
        <Requests getingMyRequest={getingMyRequest} getingAllRequest={getingAllRequest} requests={requests}/>
    )
};

export default RequestsContainer;
