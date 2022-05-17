import React, { useCallback, useEffect, useState } from "react";
import { Preloader } from "../../components/Preloader";
import { useDispatch, useSelector } from 'react-redux';
import { OperatorCard } from "./OperatorCard";
import { AddOperator } from "./AddOperator";
import { operatorLoadOperators, operatorSetSucceed } from "../../store/actionCreators/operatorsActionCreator";

export const OperatorsPage = () => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    const loading = useSelector(state => state.operatorReducer.preloader)
    const operators = useSelector(state => {
        const operatorsRaw = state.operatorReducer.operators
        const operators = operatorsRaw.map(u => 
          <OperatorCard login={u.login} id={u.id} key={u.id} />
        )
    
        return operators
      })

    const initializeHandler = useCallback( () => {
        dispatch(operatorLoadOperators())
        dispatch(operatorSetSucceed(false))
      }, [dispatch])
    
      useEffect(() => { initializeHandler() }, [initializeHandler])

    return (
        <div className="row">
            <h1>Операторы</h1>

            {loading && <Preloader />}

            {!loading && 
                <div>
                <button 
                    key="new" 
                    className="waves-effect waves-light btn" 
                    style={{display: "flex", width: '130px'}}
                    onClick={ () => setShowModal(true)}
                >
                    <i className="material-icons">add</i>
                    <span>Добавить</span>
                </button>
                
                <AddOperator 
                    show={showModal} 
                    onCreate={() => {
                        setShowModal(false)
                        initializeHandler()
                    }}
                    onClose={() => {
                    setShowModal(false)
                    }}
                />

                <div className="collection" style={{border: "0px"}}>
                    { operators }
                </div>

                </div>
            }

        </div>
    )
}