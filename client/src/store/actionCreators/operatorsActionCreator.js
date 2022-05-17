import {
    OPERATOR_SET_SUCCEED,
    OPERATOR_SET_OPERATORS,
    OPERATOR_SET_PRELOADER,
    OPERATOR_SET_ADD_FORM,
    OPERATOR_CLEAR_ADD_FORM
  } from "../actions/operatorsActions"
  
  export function operatorSetSucceed(data){
    return {
      type: OPERATOR_SET_SUCCEED,
      data
    }
  }
  
  export function operatorSetPreloader (isLoading) {
    return {
      type: OPERATOR_SET_PRELOADER,
      data: isLoading
    }
  }
  
  export function operatorSetOperators(data) {
    return {
      type: OPERATOR_SET_OPERATORS,
      data
    }
  }
  
  export function operatorLoadOperators() {
    return async(dispatch) => {
      dispatch(operatorSetPreloader(true))
  
      const method = 'GET'
      const headers = {'Content-Type': 'application/json'}
      const responce = await fetch("/api/operator", {method, headers})
  
      const data = await responce.json()
      if (responce.ok) {
        dispatch(operatorSetOperators(data))
      }
  
      dispatch(operatorSetPreloader(false))
    }
  }
  
  export function operatorSetAddForm(name, value) {
    return {
      type: OPERATOR_SET_ADD_FORM,
      data: {name, value}
    }
  }
  
  export function operatorClearAddForm () {
    return {
      type: OPERATOR_CLEAR_ADD_FORM
    }
  }
  
  export function operatorAdd(form){
    return async(dispatch) => {
      dispatch(operatorSetPreloader(true))
      
      const method = 'POST'
      const headers = {'Content-Type': 'application/json'}
      const body = JSON.stringify({...form})
      const responce = await fetch("/api/operator/registration", {method, body, headers})
  
      if (responce.ok) {
        dispatch(operatorSetSucceed(true))
        dispatch(operatorClearAddForm())
      }
  
      dispatch(operatorSetPreloader(false))
    }
  }
  
  export function operatorDelete(userId) {
    return async(dispatch) => {
      dispatch(operatorSetPreloader(true))
  
      const method = 'DELETE'
      const headers = {'Content-Type': 'application/json'}
      const responce = await fetch("/api/operator/" + userId, {method, headers})
  
      if (responce.ok) {
        dispatch(operatorLoadOperators())
      }
  
      dispatch(operatorSetPreloader(false))
    }
  }