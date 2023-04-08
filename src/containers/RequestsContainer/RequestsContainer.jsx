import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyRequests, getAllRequests, addRequestToUser, removeRequestFromUser, cancelRequest, closeRequest,removeRequest } from '../../store/services/requestsSlice';
import Requests from '../../components/Requests/Requests';
import { useNavigate } from 'react-router-dom';

const RequestsContainer = () => {
  const { user } = useSelector((state) => state.users);
  const requests = useSelector((state) => state.requests.requests);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const cancellingRequestsHandler = useCallback(async (selected) => {
    if(selected.length > 0) {
      await Promise.all(selected.map(async id => {
        id = parseInt(id);
        await dispatch(closeRequest({
          Id: id,
          navigate
        }))
      }));
    }
    getAllRequest();
  }, [dispatch, navigate, getAllRequest]);  

  const closingRequestsHandler = useCallback(async (selected) => {
    if(selected.length > 0) {
      await Promise.all(selected.map(async id => {
        id = parseInt(id);
        await dispatch(cancelRequest({
          Id: id,
          navigate
        }))
      }));
    }
    getAllRequest();
  }, [dispatch, navigate, getAllRequest]);  

  const removingFromUserHandler = useCallback(async (selected,rows) => {
    if(selected.length > 0) {
      await Promise.all(selected.map(async (Id) => {
        const UserId =
          rows.filter(((value) => {
            return value.id === Id
          }))[0].userId
        if(typeof UserId === "number") {
          await dispatch(removeRequestFromUser({
            Id,
            UserId,
            navigate
          }))
        }
      }));
    }
    getAllRequest();
  }, [dispatch, navigate, getAllRequest]);
  

  const addingToUserHandler = useCallback(async (selected) => {
    if(selected.length > 0) {
      await Promise.all(selected.map(async id => {
        id = parseInt(id);
        await dispatch(addRequestToUser({
          userData: {
            Id: id,
            UserId: user.id
          },
          navigate
        }))
      }));
    }
    getAllRequest();
  }, [dispatch, user.id, navigate, getAllRequest]);
  

  const removingRequest = useCallback(async (selected) => {
    if(selected.length > 0) {
      await Promise.all(selected.map(async id => {
        id = parseInt(id);
        await dispatch(removeRequest({
          Id: id,
          navigate
        }));
      }));
    }
    getAllRequest();
  }, [dispatch, navigate, getAllRequest]);

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
    />
  );
};

export default RequestsContainer;
