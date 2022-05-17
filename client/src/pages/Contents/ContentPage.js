import React, { useCallback, useEffect, useState } from "react";
import { Preloader } from "../../components/Preloader";
import { useDispatch, useSelector } from 'react-redux';
import { ContentCard } from "./ContentCard";
import { AddContent } from "./AddContent";
import { contentLoadContents,contentSetSucceed } from "../../store/actionCreators/contentActionCreator";

export const ContentsPage = () => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    const loading = useSelector(state => state.contentReducer.preloader)
    const contents = useSelector(state => {
        const contentsRaw = state.contentReducer.contents
        const contents = contentsRaw.map(u => 
          <ContentCard name={u.name} id={u.id} key={u.id} url={u.url} />
        )
    
        return contents
      })

    const initializeHandler = useCallback( () => {
        dispatch(contentLoadContents())
        dispatch(contentSetSucceed(false))
      }, [dispatch])
    
      useEffect(() => { initializeHandler() }, [initializeHandler])

    return (
        <div className="row">
            <h1>Контент</h1>

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
                
                <AddContent 
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
                    { contents }
                </div>

                </div>
            }

        </div>
    )
}