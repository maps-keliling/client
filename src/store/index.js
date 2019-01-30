import { createStore, combineReducers, applyMiddleware } from 'redux';
import HomeReducers from '../reducers/home';
import thunk from 'redux-thunk';

const CombinedStore =  combineReducers({
    home : HomeReducers
})
const store = createStore(CombinedStore, applyMiddleware(thunk))

export default store;



