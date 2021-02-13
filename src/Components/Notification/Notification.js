import React from "react";
import "./Notification.css";

const Notification = ({ message, errorMessage }) => {
    if (message === '' && errorMessage === '') {
        return null;
    } else if (errorMessage !== '') {
        return (
            <div id="error-message-outter">
                <div className="inner">
                    <p>{errorMessage}</p>
                </div>
            </div>
        )
    } else if (message !== '') {
        return (
            <div id="message-outter">
                <div className="inner">
                    <p>{message}</p>
                </div>
            </div>
        )
    }
}

export default Notification;