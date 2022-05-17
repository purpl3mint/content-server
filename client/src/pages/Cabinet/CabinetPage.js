import React, { useCallback, useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux'
import jwt from 'jwt-decode'
import { cabinetSetLogin } from "../../store/actionCreators/cabinetActionCreator"

export const CabinetPage = () => {
    const dispatch = useDispatch()

    const username = useSelector(state => state.cabinetReducer.login)

    const loadHandler = useCallback(() => {
        const token = JSON.parse(localStorage.getItem('userData')).token
        const login = jwt(token.token).login
        dispatch(cabinetSetLogin(login))
    }, [dispatch])

    useEffect(() => { loadHandler() }, [loadHandler])


    return (
        <div>
            <h1>Личный кабинет</h1>
            <div>
                <span className="cabinet-page__username">Имя пользователя: {username}</span><br />
            </div>
        </div>
    )
}