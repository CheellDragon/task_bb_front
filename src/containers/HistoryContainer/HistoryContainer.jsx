import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Spinner from "../../components/Spinner/Spinner";
import History from "../../components/History/History";
import { getAllRequestsHistory } from '../../store/services/requestsSlice';

const HistoryContainer = () => {
    const { requestsHistory, fetching } = useSelector((state) => state.requests);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllRequestsHistory({
            navigate
        }));
    },[dispatch, navigate])
    return (
        fetching
            ? <Spinner/>
            : requestsHistory.length > 0
                ? <History data={requestsHistory}/>
                : <p>Пока нету историй запросов</p>
    )
};

export default HistoryContainer;
