import react from "react";
import { useLocation } from "react-router-dom";


export default function Link() {
    const { state } = useLocation();
    const { uuid, files } = state;
    
    const downloadURL = `http://localhost:3000/download/${uuid}`;

    return (
        <div>
            <h3>Get your link!!</h3>
            <h3>{files.length} File(s)</h3>

            
            {files.map(file => (
                <li key={files.indexOf(file)}>
                    {file.name}
                </li>

            ))}
            

            <p>{downloadURL}</p>
        </div>
    )
}