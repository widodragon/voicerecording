import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';

import reducer from './reducers';
const logger = createLogger({});
const store = createStore(reducer, applyMiddleware(logger, promiseMiddleware));
export default store;
