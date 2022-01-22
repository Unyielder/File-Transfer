import React from "react";
import axios from "axios";

export default function Download() {

    const getDownloadLink = () => {
        axios.get("http://localhost:8080/file-sharing/download").then(res => {
            console.log(res.data);
        }).catch((err) => {
            console.log("Couldn't retrieve download link...", err)
        })
    }

    return (
        <div>
            <h3>Download here</h3>

        </div>
    )
}