import {
    CABINET_SET_LOGIN
} from '../actions/cabinetActions'
  
const initialState = {
  login: 'Неизвестно'
}
  
function cabinetReducer(state = initialState, action) {
    switch(action.type){
        case CABINET_SET_LOGIN: {
            return { ...state, login: action.data }
        }
  
        default: {
            return state
        }
    }
}
  
export default cabinetReducer