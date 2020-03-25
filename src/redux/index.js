import { combineReducers, Reducer } from 'redux';
import { reducer as login } from './loginRequest/LoginRequestRedux';
import { reducer as refreshtoken } from './loginRequest/RefreshRequestRedux';

export default combineReducers({ login, refreshtoken });
