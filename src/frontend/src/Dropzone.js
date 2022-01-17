import React, { useEffect, useState } from "react";
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

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div>
            <div {...getRootProps()} className="input-area">
                {
                    <div>
                        <p className="input-text">Drop the files here ...</p>
                        {/* <p> drop next file here </p> */}
                    </div>
                }
                <input {...getInputProps()} />
            </div>


            <div>
                <h3>Files :</h3>
                {files.map(file => (
                    <li key={files.indexOf(file)}>
                        {file.name}
                    </li>
                ))}

                <Form files={files}/>  

            </div>
        </div>
    );
}
