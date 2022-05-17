import './AddContent.css'
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { contentSetAddForm, contentAdd } from "../../store/actionCreators/contentActionCreator"
import { useMessage } from '../../hooks/message.hook';
import { PATH } from '../../utils/Config'

export const AddContent = (props) => {
    const dispatch = useDispatch()
    const message = useMessage()
    const form = useSelector(state => state.contentReducer.addForm)
    const basePath = PATH + '/stat/'

    const changeHandler = useCallback( (e) => {
        dispatch(contentSetAddForm(e.target.name, e.target.value))
        dispatch(contentSetAddForm("url", basePath + e.target.value))

    }, [dispatch])

    const changeFile = useCallback ( (e) => {
        dispatch(contentSetAddForm(e.target.name, e.target.files[0]))
    }, [dispatch])

    const createHandler = useCallback( () => {
        if (!form.name){
            message("Ошибка: не задано название контента")
            return
        }
        if (!form.file){
            message("Ошибка: не задан файл")
            return
        }

        dispatch(contentAdd(form))

        props.onCreate()
    }, [dispatch, basePath, form, props, message])

    const closeHandler = useCallback( () => {
        props.onClose()
    }, [props])


    if (!props.show) {
        return null
    }
    
    return (
        <div className='modal'>
            <div className="row modal-content">

                <h1>Загрузка нового контента</h1>
                <span>* - обязательное поле</span><br />
                <div className="col s12">

                    <div className="row">
                        <div className="input-field col s6">
                        <input id="name" name="name" type="text" value={form.name} onChange={changeHandler} />
                        <span className="helper-text">Название контента*</span>
                        </div>
                    </div>

                    <div className="file-field input-field">
                        <div className="btn">
                            <span>File</span>
                            <input type="file" name="file" accept={form.filetype} onChange={changeFile}/>
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text"/>
                        </div>
                    </div>

                    <button className="btn blue-grey darken-1" onClick={createHandler}>Создать</button>
                    <button className="btn blue-grey darken-1 btn-close" onClick={closeHandler}>Закрыть</button>

                </div>

            </div>
        </div>
        
    )
  
}