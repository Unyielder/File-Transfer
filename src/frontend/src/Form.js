import React, { useState } from "react";
import { useForm } from 'react-hook-form';

export default function Form() {
    const {register, handleSubmit} = useForm();
    const [isEmail, setEmail] = useState(false);

    // const onRadioChange = () => {
    //     if()
    // }

    // const onSubmit = () => {

    // }

    return (
        <form className="Form" >
            <label>Title
                <input type="text" name="title" {...register("title", {required:true})}/>
            </label>

            <label>Message
                <input type="textarea" name="message" {...register("message")}/>
            </label>
            <label>Transfer type
                <input type="radio" id="email" name="transfer-type" value="email" {...register("radioButton")}/>
                <label htmlFor="email">Email</label>
                <input type="radio" id="link" name="transfer-type" value="link" {...register("radioButton")}/>
                <label htmlFor="link">Link</label>
            </label>
            
            
            <input type="submit"/>


        </form>
    )
}