import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyRequests, getAllRequests,addRequestToUser } from '../../store/services/requestsSlice';
import Requests from '../../components/Requests/Requests';
import { useNavigate } from 'react-router-dom';

const RequestsContainer = () => {
  const { user } = useSelector((state) => state.users);
  const requests = useSelector((state) => state.requests.requests);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addingToUserHandler = useCallback((selected) => {
    if(selected.length > 0) {
        selected.forEach(id => {
            id = parseInt(id);
            dispatch(addRequestToUser({
                userData: {
                    id,
                    UserId: user.id
                },
                navigate
            }))
        });
    }
  }, [dispatch, user.id]);
  const getMyRequest = useCallback(() => {
    dispatch(getMyRequests({
        id: user.id,
        navigate
    }));
  }, [dispatch, user.id]);

  const getAllRequest = useCallback(() => {
    dispatch(getAllRequests({
        navigate
    }));
  }, [dispatch]);

  const [requestsKey, setRequestsKey] = useState(0);

  useEffect(() => {
    setRequestsKey((prevKey) => prevKey + 1);
  }, [requests]);

  return (
    <Requests
      key={requestsKey}
      getingMyRequest={getMyRequest}
      getingAllRequest={getAllRequest}
      requests={requests}
      addingToUserHandler={addingToUserHandler}
    />
  );
};

export default RequestsContainer;
