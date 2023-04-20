import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyRequests, getAllRequests, addRequestToUser, removeRequestFromUser, cancelRequest, 
  closeRequest,removeRequest,addRequestHistory } from '../../store/services/requestsSlice';
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

  const cancellingRequestsHandler = useCallback(async (selected,rows) => {
    if(selected.length > 0) {
      await Promise.all(selected.map(async id => {
        const row = rows.find(row => row.id === id);
        id = parseInt(id);
        dispatch(closeRequest({
          token: user.token,
          Id: id,
          navigate
        }))
        dispatch(addRequestHistory({
          token: user.token,
          requestId: id,
          userId: user.id,
          actionColumn: "Статус: Отменена заявки",
          prevData: row.status,
          newData: 3,
          navigate
        }))
      }));
    }
    getAllRequest();
  }, [getAllRequest, dispatch, user.token, user.id, navigate]);  

  const closingRequestsHandler = useCallback(async (selected,rows) => {
    if(selected.length > 0) {
      await Promise.all(selected.map(async id => {
        const row = rows.find(row => row.id === id);
        id = parseInt(id);
        dispatch(cancelRequest({
          token: user.token,
          Id: id,
          navigate
        }))
        dispatch(addRequestHistory({
          token: user.token,
          requestId: id,
          userId: row.userId ? row.userId : "",
          actionColumn: "Статус: Закрытие заявки",
          prevData: row.status,
          newData: 2,
          navigate
        }))
      }));
    }
    getAllRequest();
  }, [getAllRequest, dispatch, user.token, navigate]);  

  const removingFromUserHandler = useCallback(async (selected,rows) => {
    if(selected.length > 0) {
      await Promise.all(selected.map(async (id) => {
        const row = rows.find(row => row.id === id);
        const UserId =
          rows.filter(((value) => {
            return value.id === id
          }))[0].userId
        if(typeof UserId === "number") {
          dispatch(removeRequestFromUser({
            token: user.token,
            Id: id,
            UserId,
            navigate
          }))
          dispatch(addRequestHistory({
            token: user.token,
            requestId: id,
            userId: user.id,
            actionColumn: "Открепление заявки от пользователя",
            prevData: row.userId ? row.userId : "",
            newData: "-",
            navigate
          }))
        }
      }));
    }
    getAllRequest();
  }, [getAllRequest, dispatch, user.token, user.id, navigate]);
  

  const addingToUserHandler = useCallback(async (selected,rows) => {
    if(selected.length > 0) {
      await Promise.all(selected.map(async id => {
        const row = rows.find(row => row.id === id);
        id = parseInt(id);
        dispatch(addRequestToUser({
          token: user.token,
          userData: {
            Id: id,
            UserId: user.id
          },
          navigate
        }))
        dispatch(addRequestHistory({
          token: user.token,
          requestId: id,
          userId: user.id,
          actionColumn: "Добавление заявки к пользователю",
          prevData: row.userId ? row.userId : "-",
          newData: user.id,
          navigate
        }))
      }));
    }
    getAllRequest();
  }, [user, getAllRequest, dispatch, navigate]);
  

  const removingRequest = useCallback(async (selected,rows) => {
    if(selected.length > 0) {
      await Promise.all(selected.map(async id => {
        const row = rows.find(row => row.id === id);
        id = parseInt(id);
        dispatch(removeRequest({
          token: user.token,
          Id: id,
          navigate
        }));
        dispatch(addRequestHistory({
          token: user.token,
          requestId: id,
          userId: user.id,
          actionColumn: "Удаление Заявки",
          prevData: `
            ID: ${row.id};
            FIO: ${row.fio};
            Email: ${row.email};
            PhoneNumber: ${row.phoneNumber};
            Status: ${row.status};
            UserID: ${row.userId};`,
          newData: "-",
          navigate
        }))
      }));
    }
    getAllRequest();
  }, [getAllRequest, dispatch, user.token, user.id, navigate]);

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
