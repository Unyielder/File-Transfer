import react from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Link.css";


export default function Link() {
    const { state } = useLocation();
    const { uuid, files } = state;
    
    const downloadURL = `http://localhost:3000/download/${uuid}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(downloadURL);
        toast.success("Copied", {
            position: "top-right",
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: 1,
            limit:1
            });
    }
    

    return (
        <div className="link-container">
            <div className="link-content">
                <h3 className="get-your-link">Get your link!!</h3>
                {
                    files.length == 1 ?
                    <p className="x-file">1<span className="file-text"> File</span></p> : <p className="x-file">{files.length}<span className="file-text"> Files</span></p>
                }

            <div className="file-list">
                {files.map(file => (
                    <li className="file-item" key={files.indexOf(file)}>
                        {file.name}
                    </li>

                ))}
            </div>
                <input className="copy-input" value={downloadURL}/>

                <button onClick={() => handleCopy()} id="copy-btn" readOnly>
                <i className="fas fa-copy"></i>
                </button>
                <ToastContainer
                    position="top-right"
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={true}
                    rtl
                    pauseOnFocusLoss
                    draggable={false}
                    pauseOnHover
                    />

            </div>
        </div>
        
    )
}