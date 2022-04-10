import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { convertBytes, getTotalSize } from "../Utils";
import Form from '../form/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Dropzone.css'


export default function Dropzone() {
    const [files, setFiles] = useState([]);
    const [totalSize, setTotalSize] = useState([]);
    const MAX_FILE_SIZE = 500;
    let allFiles = [];
    let fileSize = 0;

    const onDrop = acceptedFiles => {
        if(isUniqueFileName(acceptedFiles, files)) {
            allFiles = [...files, ...acceptedFiles];
            fileSize = getTotalSize(allFiles);

            if(fileSize <= MAX_FILE_SIZE) {
                setFiles(allFiles);
                setTotalSize(fileSize); 
            } else {
                toast.error(`File size limit exceeded, can only upload ${MAX_FILE_SIZE}mb at a time`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
            
        } else {
            toast.error("Files cannot have identical names", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        
    };

    const isUniqueFileName = (droppedFiles, uploadedFiles) => {
        const droppedFileNames = droppedFiles.map(file => file.name);
        const uploadedFileNames = uploadedFiles.map(file => file.name);
        const allFileNames = [...droppedFileNames, ...uploadedFileNames];

        return (new Set(allFileNames)).size === allFileNames.length;
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className="container">
            <ToastContainer/>
            <div className="upload-container">
            <div {...getRootProps()} className="upload">
                
                    <div className="upload-image">
                        <i className="fas fa-cloud-upload-alt"></i>
                    </div>
                    <div className="upload-here">
                        <p>
                            {
                                files.length === 0 ?
                                <span>Upload files here</span> :
                                <span>Add more files</span>
                            }  
                        </p>
                    </div>
                    <div className="upload-stats">
                            
                            {
                                files.length === 0 ? 
                                null : 
                                <div>
                                    <p>{files.length}<span className="upload-stats-label"> file(s)</span></p>
                                    <p>{totalSize} <span className="upload-stats-label"> /{MAX_FILE_SIZE} mb</span></p>
                                </div>
                                
                            }
                                 
                    </div>
                
                <input {...getInputProps()} />
            </div>


            <div className="file-list">
                {files.map(file => (
                    <li className="file-item" key={files.indexOf(file)}>
                        {file.name} <br/> 
                        <span className="file-metadata">{convertBytes(file.size)}</span> - <span className="file-metadata">{file.type}</span>
                    </li>
                ))}
            </div>
            </div>
            
            <Form files={files}/> 
        </div>
        
    );
}
