import react from "react";

export default function Popup({ open, children }) {
    if(!open) return null
    return (
        <div className="popup">
            <div className="popup-inner">
                <i className="fas fa-spinner"></i>
                { children }
            </div>
        </div>        
    ) 
}