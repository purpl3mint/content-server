import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { contentDelete } from "../../store/actionCreators/contentActionCreator"

export const ContentCard = (props) => {
  const {name, id, url} = props
  const dispatch = useDispatch()

  const deleteHandler = useCallback(() => {
    dispatch(contentDelete(id))
  }, [dispatch, id])

  return (
    <div className="row" style={{marginLeft: "2px"}}>
      <div className="col s10">
        <div
          className="collection-item card" 
          style={{marginBottom: "25px", border: "1px solid grey"}}
        >
            Название контента: {name}<br/>
            <span>Ссылка на контент: <span style={{color: "red"}}>{url}</span></span>
        </div>
      </div>

      <button name={id} className="btn" onClick={deleteHandler}>
        <i className="material-icons">delete</i>
      </button>
    </div>
  )
}