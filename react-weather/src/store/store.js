import { applyMiddleware, createStore, compose  } from 'redux';
import thunk from 'redux-thunk'
// import logger from 'redux-logger';

import { rootReducer } from './reducers/rootReducer';

const store = createStore(
    rootReducer, 
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

export default store;

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// applyMiddleware(logger, thunk)