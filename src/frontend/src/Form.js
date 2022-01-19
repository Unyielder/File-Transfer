import React from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';


export default function Form({ files }) {
    const {register, handleSubmit} = useForm();
    const formData = new FormData();

    files.forEach(file => {
        formData.append("file", file);
    })
    
    const onSubmit = () => {
        if(!formData.get("file")) {
            alert("You need to attach atleast 1 file before submitting.")
        } else {
            axios.post(
                "http://localhost:8080/file-sharing/upload",
                formData,
                {
                    "headers": {
                        "Content-Type": "multipart/form-data"
                    }
                }
            ).then(() => {
                console.log("Upload Successful!");
            }).catch((err) => {
                console.log("Unable to upload file", err);
            })
        }
    }

    return (
        
        <form className="Form" onSubmit={handleSubmit(() => onSubmit())}>
            <label>Title
                <input type="text" name="title" {...register("title", {required:true})}/>
            </label>

            <label>Message
                <input type="textarea" name="message" {...register("message")}/>
            </label>

            <input type="submit" value="Generate link"/>

        </form>
    )
}