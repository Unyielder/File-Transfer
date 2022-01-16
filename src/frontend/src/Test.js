import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Form from './Form';
import ConfirmButton from './ConfirmButton';
import "./App.css";


export default function App() {
  const [files, setFiles] = useState([]);
  

  const onDrop = acceptedFiles => {
    const allFiles = [...files, ...acceptedFiles];
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
      <div >
        Files :
        {files.map(file => (
            <li key={files.indexOf(file)}>
                {file.name}
            </li>
        ))}

        {files.length == 0 ? null : <ConfirmButton />}


        
        {/* { isConfirm ? <Form /> : null } */}
      </div>
    </div>
  );
}
