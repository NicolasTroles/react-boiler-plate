// Modules
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom'

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'; // SAGA
import rootReducers from './redux/rootReducers';
import rootSagas from './redux/rootSagas';

// Styles
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

// Router
import { HashRouter } from 'react-router-dom';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(rootReducers, {}, composeEnhancers(applyMiddleware(sagaMiddleware)));

// run the saga
sagaMiddleware.run(rootSagas);

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <BrowserRouter>
                <AppRouter />
            </ BrowserRouter>
        </HashRouter>
    </Provider>
    , document.getElementById('root'));
// registerServiceWorker();
