import {
    CABINET_SET_LOGIN
  } from '../actions/cabinetActions'
  
  export function cabinetSetLogin(data) {
    return{
      type: CABINET_SET_LOGIN,
      data
    }
  }