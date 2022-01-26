import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import axios from "axios";
import { useNavigate } from "react-router-dom";


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
            console.log("Couldn't retrieve download link", e);
        }
        
        
    }

    return (
        <div>
            <h3>Download here</h3>
            
            <p>{title}</p>
            <p>{message}</p>
            <a href={downloadLink}>download</a>
        </div>
    )
}