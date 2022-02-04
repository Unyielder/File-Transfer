import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Download.css"


export default function Download() {
    const location = useLocation();
    
    const [downloadLink, setDownloadLink] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
        const path = location.pathname;
        const index = path.lastIndexOf('/') + 1;
        const uuid = path.substring(index);

        getFileTransferData(uuid);
        
    }, [])

   

    const getFileTransferData = async (uuid) => {
        try {
            const res = await axios.get(`http://localhost:8080/file-sharing/download/${uuid}`)
            console.log(res.data);
            
            const linkCreationDate = new Date(res.data.linkCreationDate);
            const today = new Date();
            const diffInDays = (today.getTime() - linkCreationDate.getTime()) / (1000 * 3600 * 24);
            if(diffInDays >= 7) {
                navigate("/expired");
            } else {
                setDownloadLink(res.data.downloadLink);
                setTitle(res.data.title);
                setMessage(res.data.message);
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
            
            <p className="download-message-title">Message:</p>
            <div className="download-message-container">
                <p className="download-message">{message}</p>
            </div>
            
            <a className="download-link" href={downloadLink}>download</a>
        </div>
    )
}