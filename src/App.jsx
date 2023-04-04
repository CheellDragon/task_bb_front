import React from 'react';
import {useSelector} from 'react-redux';
import Navigation from './containers/Navigation/Navigation';
import {Routes, Route, BrowserRouter} from 'react-router-dom';

const App = () => {
    const {user} = useSelector(state => state.users);
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigation/>}>
                    <Route index element={<div>Authorization</div>}/>
                    <Route path='register' element={<div>register</div>}/>
                    <Route path='create' element={<div>create</div>}/>
                    <Route path='requests' element={<div>requests</div>}/>
                    <Route path='history' element={<div>history</div>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
};

export default App;
