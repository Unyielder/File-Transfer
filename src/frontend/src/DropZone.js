import React, {useState, useEffect, useCallback} from "react";
import {useDropzone} from "react-dropzone";
import axios from "axios";
import Form from './Form'


export default function DropZone() {
  const [files, setFiles] = useState([]); 
  let newFiles = [];
  const allFiles = [];

  // useEffect(() => {
  //   setFiles(prevFiles => [...prevFiles, ...newFiles]);
  // }, newFiles);

    const onDrop = useCallback(acceptedFiles => {
      setFiles(prevFiles => [...files, ...acceptedFiles]);
      
      
      
      newFiles = acceptedFiles;
      allFiles.push(acceptedFiles); 
      // setFiles(prevFiles => [...files, ...acceptedFiles]);
     
      console.log("allFile", allFiles);
      console.log("files:", files);


      
      const formData = new FormData();
      //formData.append("file", files);
      //console.log(formData)

      // axios.post(
      //   "http://localhost:8080/file-sharing/upload",
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data"
      //     }
      //   }
      // ).then(() => {
      //   console.log("File uploaded succesfully!");
      // })
      // .catch((err) => {
      //   console.log(err);
      // })
      
    
    }, []);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
    return (        
      
      <div{...getRootProps()}>
        <div>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
          }
        </div>
        <div>
          <h3>Files:</h3>
          <ul>
          {
            allFiles.map(file => {
              <li>{file.path}</li>
            })
          }
          </ul>
        </div>
    </div>
        
      
    )
  }
