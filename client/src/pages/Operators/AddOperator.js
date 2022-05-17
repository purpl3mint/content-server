import './AddOperator.css'
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { operatorSetAddForm, operatorAdd } from "../../store/actionCreators/operatorsActionCreator"
import { useMessage } from '../../hooks/message.hook';

export const AddOperator = (props) => {
  const dispatch = useDispatch()
  const message = useMessage()
  const form = useSelector(state => state.operatorReducer.addForm)

  const changeHandler = useCallback( (e) => {
      dispatch(operatorSetAddForm(e.target.name, e.target.value))
  }, [dispatch])

  const createHandler = useCallback( () => {
      if (!form.login){
          message("Ошибка: не задано имя пользователя")
          return
      }
      if (!form.password){
          message("Ошибка: не задан пароль")
          return
      }

      dispatch(operatorAdd(form))

      props.onCreate()
  }, [dispatch, form, props, message])

  const closeHandler = useCallback( () => {
    props.onClose()
  }, [props])


  if (!props.show) {
    return null
  }
  
  return (
    <div className='modal'>
      <div className="row modal-content">

        <h1>Создание нового оператора</h1>
        <span>* - обязательное поле</span><br />
        <div className="col s12">

          <div className="row">
            <div className="input-field col s6">
              <input id="login" name="login" type="text" value={form.login} onChange={changeHandler} />
              <span className="helper-text">Имя оператора*</span>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input id="password" name="password" type="text" value={form.password} onChange={changeHandler} />
              <span className="helper-text">Пароль*</span>
            </div>
          </div>

          <button className="btn blue-grey darken-1" onClick={createHandler}>Создать</button>
          <button className="btn blue-grey darken-1 btn-close" onClick={closeHandler}>Закрыть</button>

        </div>

      </div>
    </div>
    
  )
  
}