import { Alert } from "@mui/material";
import React, { createContext, useState, useEffect, useContext } from "react"
import Cookies from "universal-cookie";

const cookies = new Cookies();

const setCookie = (email, firstName) => {
    cookies.set('email', email, { path: '/', maxAge: 2592000 });
    cookies.set('firstName', firstName, { path: '/', maxAge: 2592000 });
    console.log(cookies.get('email'));
}

const setLogin = (email, firstName) => {
    setCookie(email, firstName);
}

// export const postRegisterForm = async (finalValues) => {
    export const postRegisterForm = async (finalValues) => {
    console.log(finalValues);
    try {
        // const res = await fetch('http://localhost:8000/add', {
        //     method: 'POST',
        //     body: JSON.stringify(finalValues),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        // console.log("sending request")
        // });
        // if (res.status === 200) {
        //     const response = await res.json();
        //     setLogin(finalValues.email, finalValues.firstName);
        //     // alert(response);
        //     return response;
        // }
        console.log("sending request")

    } catch (error) {
        console.log('Error while calling addUser api', error);

    }

};
