import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import authReducer from './reducers/authReducer'
import cabinetReducer from './reducers/cabinetReducer'
import operatorReducer from './reducers/operatorReducer'
import contentReducer from './reducers/contentReducer'

const rootReducer = combineReducers({
    authReducer,
    cabinetReducer,
    operatorReducer,
    contentReducer
})

const store = createStore(rootReducer, compose(
    applyMiddleware(thunk)
))
  
export default store