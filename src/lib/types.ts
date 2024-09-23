export interface IUser {
    id: string
    name: string
    surname: string
    login: string
    password: string
    isPrivate: boolean
    cover: string
    picture: string
}

export type InputUser = Omit<IUser, 'id' | 'cover' | 'picture' | 'isPrivate'>

export interface IResponse {
    status: string
    message?: string
    payload?: unknown
}