import React, { useState } from "react";
import Form from './Form';

export default function ConfirmButton() {
    const [isDisabled, setDisabled] = useState(false);
    const [isFormVisible, setFormVisible] = useState(false);

    const handleClick = () => {
        setFormVisible(true);
        setDisabled(true);
      }
    return (
        <div>
            <button onClick={() => handleClick()} disabled={isDisabled}>Next</button>  
            
            {isFormVisible ? <Form /> : null}
            
        </div>        
    )
}