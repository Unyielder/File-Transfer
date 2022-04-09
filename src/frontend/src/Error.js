import React, { useEffect } from "react";
import "./Error.css"
import { setGlobalState } from './Form'

export default function Error() {

    useEffect(() => {
        setGlobalState("isLoading", false)
    }, [])

    return (
        <div className="error-container">
            <h2 className="error-error">Error 500</h2>
            <p className="error-text">Something went wrong during upload</p>
        </div>
    )
}