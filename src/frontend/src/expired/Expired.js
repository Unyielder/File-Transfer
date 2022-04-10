import React, { useEffect } from "react";
import "./Expired.css"
import { setGlobalState } from '../form/Form'

export default function Expired() {

    useEffect(() => {
        setGlobalState("isLoading", false)
    }, [])


    return (
        <div className="expired-container">
            <h2 className="expired-text">Download link is expired or unavailable</h2>
        </div>
    )
}