import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Form from './Form';
import "./App.css";


export default function Dropzone() {
    const [files, setFiles] = useState([]);
    let allFiles = [];

    const onDrop = acceptedFiles => {
        allFiles = [...files, ...acceptedFiles];
        console.log(allFiles);

        setFiles(allFiles);
    };

    const convertBytes = (bytes) => {
        if(bytes.toString().length <= 6) {
            return [(bytes/1000).toFixed(1), " kb"];    
        } 
        else if(bytes.toString().length > 6) {
            return [(bytes/1000000).toFixed(1), " mb"];
        }
    }

    const getTotalSize = () => {
        let totalSize = 0;
        files.forEach(file => {
            let mb = file.size/1000000;
            totalSize += mb;
        })
        return totalSize.toFixed(2);
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className="container">
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
                                    <p>{getTotalSize()} <span className="upload-stats-label">mb /1 gb</span></p>
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
                        {/* <button className="delete">X</button> */}
                    </li>
                ))}
            </div>
            </div>
            <Form files={files}/> 
        </div>
        
    );
}
