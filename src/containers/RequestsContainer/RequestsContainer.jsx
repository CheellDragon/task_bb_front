import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyRequests, getAllRequests, addRequestToUser, removeRequestFromUser, cancelRequest, closeRequest } from '../../store/services/requestsSlice';
import Requests from '../../components/Requests/Requests';
import { useNavigate } from 'react-router-dom';

const RequestsContainer = () => {
  const { user } = useSelector((state) => state.users);
  const requests = useSelector((state) => state.requests.requests);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cancellingRequestsHandler = useCallback((selected) => {
    if(selected.length > 0) {
        selected.forEach(id => {
            id = parseInt(id);
            dispatch(closeRequest({
                Id: id,
                navigate
            }))
        });
    }
  }, [dispatch, navigate]);

  const closingRequestsHandler = useCallback((selected) => {
    if(selected.length > 0) {
        selected.forEach(id => {
            id = parseInt(id);
            dispatch(cancelRequest({
                Id: id,
                navigate
            }))
        });
    }
  }, [dispatch, navigate]);

  const removingFromUserHandler = useCallback((selected,rows) => {
    if(selected.length > 0) {
        selected.forEach((Id) => {
            const UserId =
              rows.filter(((value) => {
                return value.id === Id
              }))[0].userId
            if(typeof UserId === "number") {
              dispatch(removeRequestFromUser({
                  Id,
                  UserId,
                  navigate
              }))
            }
        });
    }
  }, [dispatch, navigate]);

  const addingToUserHandler = useCallback((selected) => {
    if(selected.length > 0) {
        selected.forEach(id => {
            id = parseInt(id);
            dispatch(addRequestToUser({
                userData: {
                    Id: id,
                    UserId: user.id
                },
                navigate
            }))
        });
    }
  }, [dispatch, user.id, navigate]);

  const getMyRequest = useCallback(() => {
    dispatch(getMyRequests({
        id: user.id,
        navigate
    }));
  }, [dispatch, user.id, navigate]);

  const getAllRequest = useCallback(() => {
    dispatch(getAllRequests({
        navigate
    }));
  }, [dispatch, navigate]);

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
      cancellingRequestsHandler={cancellingRequestsHandler}
      removingFromUserHandler={removingFromUserHandler}
      closingRequestsHandler={closingRequestsHandler}
    />
  );
};

export default RequestsContainer;
