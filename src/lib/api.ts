import axios from "axios";
import { IChangeLogin, IChangePassword, InputUser, IResponse } from "./types";

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

export const handleUpdatePass = async (password: IChangePassword): Promise<IResponse> => {
    const response = await Axios.patch("/update/password", password)
    return response.data
}

export const handleUpdateLogin = async (login: IChangeLogin): Promise<IResponse> => {
    const response = await Axios.patch("/update/login", login)
    return response.data
}

export const handlePictureUpload = async (data: FormData): Promise<IResponse> => {
    const response = await Axios.patch("/profile/upload", data)
    return response.data
}

export const handleCoverUpload = async (data: FormData): Promise<IResponse> => {
    const response = await Axios.patch("/cover/upload", data)
    return response.data
}

export const handleGetPosts = async (): Promise<IResponse> => {
    const response = await Axios.get("/posts")
    return response.data
}

export const handlePostCreation = async (data: FormData): Promise<IResponse> => {
    const response = await Axios.post("/posts", data)
    return response.data
}

export const handleSearch = async (text: string): Promise<IResponse> => {
    const response = await Axios.get("/search/" + text)
    return response.data
}

export const handleStatusChange = async (): Promise<IResponse> => {
    const response = await Axios.patch("/account/set/")
    return response.data
}

export const handleAccount = async (id: string | undefined): Promise<IResponse> => {
    const response = await Axios.get("account/" + id)
    return response.data
}