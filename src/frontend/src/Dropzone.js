import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { convertBytes, getTotalSize } from "./Utils";
import Form from './Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";


export default function Dropzone() {
    const [files, setFiles] = useState([]);
    let allFiles = [];

    const onDrop = acceptedFiles => {
        if(isUniqueFileName(acceptedFiles, files)) {
            console.log("all files unique")
            allFiles = [...files, ...acceptedFiles];
            console.log(allFiles);

            setFiles(allFiles);
            console.log("state: ", allFiles)
        }
        else {
            toast.error("Files can't have identical names", {
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
        
        console.log("raw size: ", allFileNames.length);
        console.log("unique size: ", new Set(allFileNames).size);
        
        return (new Set(allFileNames)).size == allFileNames.length;
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className="container">
            <ToastContainer/>
            <div className="upload-container">
            <div {...getRootProps()} className="upload">
                
                    <div className="upload-image">
                        <i className="fas fa-plus-circle"></i>
                    </div>
                    <div className="upload-here">
                        <p>
                            {
                                files.length == 0 ?
                                <span>Upload files here</span> :
                                <span>Add more files</span>
                            }  
                        </p>
                    </div>
                    <div className="upload-stats">
                            
                            {
                                files.length == 0 ? 
                                null : 
                                <div>
                                    <p>{files.length}<span className="upload-stats-label"> file(s)</span></p>
                                    <p>{getTotalSize(files)} <span className="upload-stats-label">mb /1 gb</span></p>
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
