import React from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Link from './Link'


export default function Form({ files }) {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const formData = new FormData();

    files.forEach(file => {
        formData.append("file", file);
    })

    const restart = () => {
        window.location.reload()
    }
    
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
                navigate(`link/${uuid}`, { state: { uuid: uuid, files: files } });

            }).catch((err) => {
                console.log("Unable to upload file", err);
            })
        }
    }

       

    return (
        
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            
            <div className="title">
                <label className="label">Title</label>
                <p className="label-desc">Describe your transfer</p>
                <input
                    className="input input-title"
                    value="test title"
                    type="text" 
                    name="title" 
                    {...register("title", {required:true})}/>
            </div>

            <div className="message">
                <label className="label">Message </label>
                <p className="label-desc">Add a message to your transfer</p>
                <textarea
                    className="input input-message"
                    type="textarea" 
                    name="message" 
                    {...register("message")}/>
            </div>

            <div className="form-buttons">
                <input 
                    className="button button-restart"
                    type="button" 
                    value="Restart"
                    onClick={() => restart()}/>
                <input 
                    className="button button-submit"
                    type="submit" 
                    value="Generate link"/>
            </div>
        </form>
    )
}