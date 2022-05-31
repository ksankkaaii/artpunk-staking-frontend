import React from "react";

import './index.css'

const Button = (props: any) => {
    return (
        <>
            {props.dark && <button
                className="dark mr_10"
                style={props.style}
                onClick={props.onClick}>
                {props.value}
                {props.src && <img src={props.src} alt="icon" />}
            </button>}
            {props.light && <button
                className="light mr_10"
                style={props.style}
                onClick={props.onClick}>
                {props.value}
            </button>}
        </>
    )
}

export default Button