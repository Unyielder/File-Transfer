import react from "react";
import { useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from 'react-tooltip';
import "./Link.css";


export default function Link() {
    const { state } = useLocation();
    const { uuid, files } = state;
    
    const downloadURL = `http://localhost:3000/#/download/${uuid}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(downloadURL);
        
    }
    

    return (
        <div className="link-container">
            <div className="link-content">
                <h3 className="get-your-link">Get your link!!</h3>
                {
                    files.length == 1 ?
                    <p className="x-file">1<span className="file-text"> File</span></p> : <p className="x-file">{files.length}<span className="file-text"> Files</span></p>
                }

            <div className="link-file-list">
                {files.map(file => (
                    <li className="file-item" key={files.indexOf(file)}>
                        {file.name}
                    </li>

                ))}
            </div>
                <input className="copy-input" value={downloadURL}/>
                
                <a data-tip="Copied!" data-event='click focus'>
                    <button id="copy-btn" readOnly>
                        <i className="fas fa-copy"></i>
                    </button>
                </a>
                <ReactTooltip 
                    globalEventOff='click'
                    afterShow={handleCopy} />

            </div>
        </div>
        
    )
}