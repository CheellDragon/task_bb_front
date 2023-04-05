import React from 'react';
import {useSelector} from 'react-redux';
import Navigation from './containers/Navigation/Navigation';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import CreateContainer from './containers/CreateContainer/CreateContainer';
import AuthorizationContainer from './containers/AuthorizationContainer/AuthorizationContainer';
import RegisterContainer from './containers/RegisterContainer/RegisterContainer';
import RequestsContainer from './containers/RequestsContainer/RequestsContainer';
import ProtectedRoute from './containers/ProtectedRoute/ProtectedRoute';
import HistoryContainer from './containers/HistoryContainer/HistoryContainer';
import Status from './containers/Status/Status';

const App = () => {
    const {user} = useSelector(state => state.users);
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigation/>}>
                    <Route index element={
                        <ProtectedRoute
                            isAllowed={!user}
                            redirectedPath='create'
                        >
                            <AuthorizationContainer/>
                        </ProtectedRoute>
                    }/>
                    <Route path='register' element={
                        <ProtectedRoute
                            isAllowed={!user}
                            redirectedPath='create'
                        >
                            <RegisterContainer/>
                        </ProtectedRoute>}
                    />
                    <Route path='create' element={
                        <ProtectedRoute
                            isAllowed={user}
                            redirectedPath='/'
                        >
                            <CreateContainer/>
                        </ProtectedRoute>
                    }/>
                    <Route path='requests' element={
                        <ProtectedRoute
                            isAllowed={user}
                            redirectedPath='/'
                        >
                            <RequestsContainer/>
                        </ProtectedRoute>
                    }/>
                    <Route path='history' element={
                        <ProtectedRoute
                            isAllowed={user}
                            redirectedPath='/'
                        >
                            <HistoryContainer/>
                        </ProtectedRoute>
                    }/>
                    <Route path="modal/:message" element={<Status/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
};

export default App;
