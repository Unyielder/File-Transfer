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
            return [(bytes/1000).toFixed(1), "kb"];    
        } 
        else if(bytes.toString().length > 6) {
            return [(bytes/1000000).toFixed(1), "mb"];
        }
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div>
            <h1>Welcome to FileDrive!</h1> 
            <div {...getRootProps()} className="input-area">
                {
                    <div>
                        <p className="input-text">Drop the files here ...</p>
                        <img className="upload-icon" src={addLogo} alt="upload icon"/>
                    </div>
                }
                <input {...getInputProps()} />
            </div>


            <div>
                <h3>Files :</h3>
                {files.map(file => (
                    <li className="file-item" key={files.indexOf(file)}>
                        {file.name} | {convertBytes(file.size)} | {file.type}
                    </li>
                ))}

                <Form files={files}/>  

            </div>
        </div>
    );
}
