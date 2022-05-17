import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export const Sidebar = () => {
    const [component, setComponent] = useState(
        <div className="collection col s2" style={{padding: 0, marginRight: "4%"}}>
        </div>
    )

    useEffect(() => {
        let newComponent = (
            <div className="collection col s2" style={{padding: 0, marginRight: "4%"}}>
                <NavLink to="/operators" className="collection-item">Операторы</NavLink>
                <NavLink to="/contents" className="collection-item">Контент</NavLink>
            </div>
        )
        setComponent(newComponent)

    }, [])
    

    return component || <div className="collection col s2" style={{padding: 0, marginRight: "4%"}}></div>
}