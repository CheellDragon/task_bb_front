import React from 'react';
import {useSelector} from 'react-redux';
import Navigation from './containers/Navigation/Navigation';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import CreateContainer from './containers/CreateContainer/CreateContainer';
import AuthorizationContainer from './containers/AuthorizationContainer/AuthorizationContainer';
import RegisterContainer from './containers/RegisterContainer/RegisterContainer';
import RequestsContainer from './containers/RequestsContainer/RequestsContainer';

const App = () => {
    const {user} = useSelector(state => state.users);
    console.log(user);
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigation/>}>
                    <Route index element={<AuthorizationContainer/>}/>
                    <Route path='register' element={<RegisterContainer/>}/>
                    <Route path='create' element={<CreateContainer/>}/>
                    <Route path='requests' element={<RequestsContainer/>}/>
                    <Route path='history' element={<div>history</div>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
};

export default App;
