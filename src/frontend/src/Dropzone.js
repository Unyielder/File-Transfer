import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Form from './Form';
import "./App.css";
import addLogo from './images/plus.png'


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
        <div>
            <div className="upload-container">
            <div {...getRootProps()} className="upload">
                
                    <div className="upload-image">
                        <i className="fas fa-plus-circle"></i>
                        {/* <i class="fa-solid fa-circle-plus"></i> */}
                        {/* <img className="add-img" src={addLogo} alt="upload icon"/> */}
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
                            <p>{files.length} <span className="upload-stats-label">files</span></p>
                            <p>{getTotalSize()} <span className="upload-stats-label">total mb</span></p>
                    </div>
                
                <input {...getInputProps()} />
            </div>


            <div className="file-list">
                {files.map(file => (
                    <li className="file-item" key={files.indexOf(file)}>
                        {file.name} <br/> <span className="file-metadata">{convertBytes(file.size)}</span> - <span className="file-metadata">{file.type}</span>
                    </li>
                ))}
            </div>
            </div>
            <Form files={files}/> 
        </div>
        
    );
}
