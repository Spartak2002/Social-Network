import axios from "axios";
import {  IChangeLogin, IChangePassword, InputUser, IResponse } from "./types";

const Axios = axios.create({
    baseURL: "http://localhost:4002",
    withCredentials: true
})

export const handleSignUp = async (user: InputUser): Promise<IResponse> => {
    const response = await Axios.post('/signup', user)
    return response.data
}

export const handleLogin = async (user: InputUser): Promise<IResponse> => {
    const response = await Axios.post('/login', user)
    return response.data
}

export const handleVerify = async (): Promise<IResponse> => {
    const response = await Axios.get('/verify')
    return response.data
}

export const handleLogout = async (): Promise<IResponse> => {
    const response = await Axios.post('/logout')
    return response.data
}

export const handleUpdatePass = async(password: IChangePassword):Promise<IResponse> => {
    const response = await Axios.patch("/update/password",password)
    return response.data
}

export const handleUpdateLogin = async(login: IChangeLogin):Promise<IResponse> => {
    const response = await Axios.patch("/update/login",login)
    return response.data
}