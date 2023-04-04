import React from 'react';
import {useSelector} from 'react-redux';
import Navigation from './containers/Navigation/Navigation';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import CreateContainer from './containers/CreateContainer/CreateContainer';
import AuthorizationContainer from './containers/AuthorizationContainer/AuthorizationContainer';
import RegisterContainer from './containers/RegisterContainer/RegisterContainer';

const App = () => {
    const {user} = useSelector(state => state.users);
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigation/>}>
                    <Route index element={<AuthorizationContainer/>}/>
                    <Route path='register' element={<RegisterContainer/>}/>
                    <Route path='create' element={<CreateContainer/>}/>
                    <Route path='requests' element={<div>requests</div>}/>
                    <Route path='history' element={<div>history</div>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
};

export default App;
