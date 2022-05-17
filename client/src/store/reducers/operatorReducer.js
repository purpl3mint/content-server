import {
    OPERATOR_SET_SUCCEED,
    OPERATOR_SET_OPERATORS,
    OPERATOR_SET_PRELOADER,
    OPERATOR_SET_ADD_FORM,
    OPERATOR_CLEAR_ADD_FORM
  } from "../actions/operatorsActions"
  
  const initialState = {
    isSucceed: false,
    operators: [],
    preloader: false,
    addForm: {
      login: "",
      password: ""
    },
  }
  
  function operatorReducer (state = initialState, action) {
    switch(action.type){
      case OPERATOR_SET_SUCCEED:
        return { ...state, isSucceed: action.data }
      case OPERATOR_SET_OPERATORS:
        return { ...state, operators: action.data }
      case OPERATOR_SET_PRELOADER:
        return { ...state, preloader: action.data}
      case OPERATOR_SET_ADD_FORM: {
          let newAddForm = {...state.addForm, [action.data.name]: action.data.value}
          return { ...state, addForm: newAddForm }
      }
      case OPERATOR_CLEAR_ADD_FORM:
        return { ...state, addForm: initialState.addForm }
  
      default: 
        return state
    }
  }
  
  export default operatorReducer