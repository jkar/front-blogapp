import React from "react";
import "./Notification.css";

const Notification = ({ message, errorMessage }) => {
    if (message === '' && errorMessage === '') {
        return null;
    } else if (errorMessage !== '') {
        return (
            <div id="error-message">
                <p>{errorMessage}</p>
            </div>
        )
    } else if (message !== '') {
        return (
            <div id="message">
                <p>{message}</p>
            </div>
        )
    }
}

export default Notification;