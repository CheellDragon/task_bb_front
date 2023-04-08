import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyRequests, getAllRequests, addRequestToUser, removeRequestFromUser, cancelRequest, closeRequest,removeRequest } from '../../store/services/requestsSlice';
import Requests from '../../components/Requests/Requests';
import { useNavigate } from 'react-router-dom';

const RequestsContainer = () => {
  const { user } = useSelector((state) => state.users);
  const { requests, fetching } = useSelector((state) => state.requests);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getMyRequest = useCallback(() => {
    dispatch(getMyRequests({
        id: user.id,
        token: user.token,
        navigate
    }));
  }, [dispatch, user.id, user.token, navigate]);

  const getAllRequest = useCallback(() => {
    dispatch(getAllRequests({
        token: user.token,
        navigate
    }));
  }, [dispatch, navigate, user.token]);

  const cancellingRequestsHandler = useCallback(async (selected) => {
    if(selected.length > 0) {
      await Promise.all(selected.map(async id => {
        id = parseInt(id);
        await dispatch(closeRequest({
          token: user.token,
          Id: id,
          navigate
        }))
      }));
    }
    getAllRequest();
  }, [getAllRequest, dispatch, user.token, navigate]);  

  const closingRequestsHandler = useCallback(async (selected) => {
    if(selected.length > 0) {
      await Promise.all(selected.map(async id => {
        id = parseInt(id);
        await dispatch(cancelRequest({
          token: user.token,
          Id: id,
          navigate
        }))
      }));
    }
    getAllRequest();
  }, [getAllRequest, dispatch, user.token, navigate]);  

  const removingFromUserHandler = useCallback(async (selected,rows) => {
    if(selected.length > 0) {
      await Promise.all(selected.map(async (Id) => {
        const UserId =
          rows.filter(((value) => {
            return value.id === Id
          }))[0].userId
        if(typeof UserId === "number") {
          await dispatch(removeRequestFromUser({
            token: user.token,
            Id,
            UserId,
            navigate
          }))
        }
      }));
    }
    getAllRequest();
  }, [getAllRequest, dispatch, user.token, navigate]);
  

  const addingToUserHandler = useCallback(async (selected) => {
    if(selected.length > 0) {
      await Promise.all(selected.map(async id => {
        id = parseInt(id);
        await dispatch(addRequestToUser({
          token: user.token,
          userData: {
            Id: id,
            UserId: user.id
          },
          navigate
        }))
      }));
    }
    getAllRequest();
  }, [getAllRequest, dispatch, user.token, user.id, navigate]);
  

  const removingRequest = useCallback(async (selected) => {
    if(selected.length > 0) {
      await Promise.all(selected.map(async id => {
        id = parseInt(id);
        await dispatch(removeRequest({
          token: user.token,
          Id: id,
          navigate
        }));
      }));
    }
    getAllRequest();
  }, [getAllRequest, dispatch, user.token, navigate]);

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
      removingRequest={removingRequest}
      fetching={fetching}
    />
  );
};

export default RequestsContainer;
