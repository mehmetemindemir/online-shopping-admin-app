import {applyMiddleware, combineReducers, compose, createStore} from 'redux';import thunk from 'redux-thunk';import authReducer from "./reducers/authReducer";import menuReducer from "./reducers/menuReducer";import brandReducer from './reducers/brandReducer'//const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;const rootReducer = combineReducers({    auth: authReducer,    menu: menuReducer,    brand: brandReducer});const store = createStore(rootReducer, compose(    applyMiddleware(thunk)));export default store;