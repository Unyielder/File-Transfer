import React from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { BASE_URL_BACKEND } from '../config/env.js';
import { createGlobalState } from 'react-hooks-global-state';
import './Form.css'


export const { setGlobalState, useGlobalState } = createGlobalState({ isLoading: false });

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
        if(!formData.get("file")) {
            alert("You need to attach atleast 1 file before submitting.")
        } else {
            const btnSubmit = document.getElementById('btn-submit');
            const btnRestart = document.getElementById('btn-restart');
            btnSubmit.disabled = true;
            btnRestart.disabled = true;

            const uuid = crypto.randomUUID();
            upload(uuid, input);
            setGlobalState("isLoading", true)
        }
    }

    const upload = async (uuid, input) => {
        try {
            await axios.post(
                `${BASE_URL_BACKEND}/file-sharing/upload/${uuid}/${input.title}/${input.message ? input.message : null}`,
                formData,
                {
                    "headers": {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            console.log("Upload Successful!");
            navigate(`link/${uuid}`, { state: { uuid: uuid, files: files } });
        } catch(err) {
            navigate('error')
        }
        
    }

    return (
        <div>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>

                <div className="title">
                    <label className="label">Title</label>
                    <p className="label-desc">Describe your transfer</p>
                    <input
                        className="input input-title"
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
                        maxlength="325"
                        {...register("message")}/>
                </div>

                <div className="form-buttons">
                    <input 
                        className="button button-restart"
                        id="btn-restart"
                        type="button" 
                        value="Restart"
                        onClick={() => restart()}/>
                    <input 
                        className="button button-submit"
                        id="btn-submit"
                        type="submit" 
                        value="Generate link"/>
                </div>
            </form>
        </div>
        
    )
}