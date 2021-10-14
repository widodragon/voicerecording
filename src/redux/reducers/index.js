import {combineReducers} from 'redux';
import rootReducer from './rootReducer';

const appReducer = combineReducers({
  rootReducer,
});

export default appReducer;
