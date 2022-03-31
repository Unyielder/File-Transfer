import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { convertBytes } from "./Utils";
import "./Download.css"
import { BASE_URL_BACKEND } from './config/env.js';


export default function Download() {
    const location = useLocation();
    
    const [downloadLink, setDownloadLink] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [metadata, setMetadata] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const path = location.pathname;
        const index = path.lastIndexOf('/') + 1;
        const uuid = path.substring(index);

        getFileTransferData(uuid);
        
    }, [])

   

    const getFileTransferData = async (uuid) => {
        try {
            const res = await axios.get(`${BASE_URL_BACKEND}/file-sharing/download/${uuid}`)
            
            const linkCreationDate = new Date(res.data.linkCreationDate);
            const today = new Date();
            const diffInDays = (today.getTime() - linkCreationDate.getTime()) / (1000 * 3600 * 24);
            if(diffInDays >= 7) {
                navigate("/expired");
            } else {
                setDownloadLink(res.data.downloadLink);
                setTitle(res.data.title);
                setMessage(res.data.message);

                const metaDataObj = JSON.parse(res.data.fileMetadata);
                setMetadata(metaDataObj);
            }

        } catch(e) {
            navigate("/expired");
        }
        
        
    }

    return (
        <div className="download-container">
            <p className="download-here">Download here</p>
            
            <div className="download-title-container">
                <p className="download-title">{title}</p>
            </div>
            
                {
                    message ?
                    <div>
                        <div className="download-message-container">
                            <p className="download-message">{message}</p>
                        </div>
                    </div>
                    :
                    null
                }
                
    
            <div className="download-file-list">
                {metadata.map(file => (
                    <li className="download-file-item" key={metadata.indexOf(file)}>
                        {file.name} <br/> 
                        <span className="download-file-metadata">{convertBytes(file.size)}</span> - <span className="download-file-metadata">{file.type}</span>
                    </li>
                ))}
        </div>

                <a className="download-link" href={downloadLink}>Download file{metadata.length === 1 ? null : <span>s</span>}</a>
             
        </div>
    )
}