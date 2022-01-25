import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import axios from "axios";


export default function Download() {
    const location = useLocation();
    const [downloadLink, setDownloadLink] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    
    useEffect(() => {
        const path = location.pathname;
        const index = path.lastIndexOf('/') + 1;
        const uuid = path.substring(index);

        const res = getFileTransferData(uuid);
        setDownloadLink(prev => res.downloadLink);
        setTitle(res.title);
        setMessage(res.message);
    }, [])



    const getFileTransferData = async (uuid) => {
    
        try {
            const res = await axios.get(`http://localhost:8080/file-sharing/download/${uuid}`)
            console.log(res.data);
            return res.data
        } catch(e) {
            console.log("Couldn't retrieve download link", e);
        }
        
        
    }

    return (
        <div>
            <h3>Download here</h3>
            <p>{downloadLink}</p>
        </div>
    )
}