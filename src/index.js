import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter,
    Route,
    Switch
} from 'react-router-dom';

import indexRoutes from './routes/index.jsx';

import registerServiceWorker from './registerServiceWorker';

import './assets/css/bootstrap.min.css';
import './assets/sass/light-bootstrap-dashboard.css';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

import { createStore, applyMiddleware , compose} from 'redux';
import myReducer from './reducers/index';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
// import { CookiesProvider } from 'react-cookie'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

var store = createStore(myReducer,
    composeEnhancers(
        applyMiddleware(thunk)
   ) 
);


ReactDOM.render((
    <Provider store = {store}>
     <HashRouter>
        <Switch>
            {
                indexRoutes.map((prop,key) => {
                    return (
                        <Route path={prop.path} component={prop.component}  key={key}/>
                    );
                })
            }
        </Switch>
    </HashRouter>
</Provider>
   
), document.getElementById('root'));
registerServiceWorker();
