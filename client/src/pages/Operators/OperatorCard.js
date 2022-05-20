import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { operatorDelete } from "../../store/actionCreators/operatorsActionCreator"

export const OperatorCard = (props) => {
  const {login, id} = props
  const dispatch = useDispatch()

  const deleteHandler = useCallback(() => {
    dispatch(operatorDelete(id))
  }, [dispatch, id])

  return (
    <div className="row">
      <div className="col s10">
        <div
          className="collection-item card" 
          style={{marginBottom: "25px", border: "1px solid grey"}}
        >
          {login}<br/>
        </div>
      </div>

      <button name={id} className="btn" onClick={deleteHandler}>
        <i className="material-icons">delete</i>
      </button>
    </div>
  )
}