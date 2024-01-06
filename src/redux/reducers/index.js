import { combineReducers } from 'redux';
import {authReducer} from './auth-reducer';
import { customerReducer } from './customer-reducer';

const reducers = combineReducers({
    authentication: authReducer,
    customers: customerReducer
});

export default reducers;