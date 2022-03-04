import React from "react";
import "./Error.css"

export default function Error() {

    return (
        <div className="error-container">
            <h2 className="error-error">Error 500</h2>
            <p className="error-text">Something went wrong during upload</p>
        </div>
    )
}