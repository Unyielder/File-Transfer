import react from "react";
import { useLocation } from "react-router-dom";


export default function Link() {
    const { state } = useLocation();
    const { uuid } = state;
    
    const downloadURL = `http://localhost:3000/download/${uuid}`;

    return (
        <div>
            <h3>
                Get your link!!
                <p>{downloadURL}</p>
            </h3>
        </div>
    )
}