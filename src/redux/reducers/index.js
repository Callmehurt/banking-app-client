import { combineReducers } from 'redux';
import {authReducer} from './auth-reducer';

const reducers = combineReducers({
    authentication: authReducer
});

export default reducers;