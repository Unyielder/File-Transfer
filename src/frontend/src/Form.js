import React from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function Form({ files }) {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const formData = new FormData();

    files.forEach(file => {
        formData.append("file", file);
    })
    
    const onSubmit = (input) => {
        console.log(input.title);
        console.log(input.message)
       
        if(!formData.get("file")) {
            alert("You need to attach atleast 1 file before submitting.")
        } else {
            const uuid = crypto.randomUUID();
            axios.post(
                `http://localhost:8080/file-sharing/upload/${uuid}/${input.title}/${input.message ? input.message : null}`,
                formData,
                {
                    "headers": {
                        "Content-Type": "multipart/form-data"
                    }
                }
            ).then(() => {
                console.log("Upload Successful!");
                navigate(`../link/${uuid}`, { state: { uuid } });

            }).catch((err) => {
                console.log("Unable to upload file", err);
            })
        }
    }

       

    return (
        
        <form className="Form" onSubmit={handleSubmit(onSubmit)}>
            <label>Title
                <input 
                    value="test title"
                    type="text" 
                    name="title" 
                    {...register("title", {required:true})}/>
            </label>

            <label>Message
                <input 
                    value="test message"
                    type="textarea" 
                    name="message" 
                    {...register("message")}/>
            </label>

            <input 
                type="submit" 
                value="Generate link"/>
        </form>
    )
}