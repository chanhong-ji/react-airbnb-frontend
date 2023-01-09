import { AxiosError, AxiosResponse } from "axios";
export interface IRoomList {
    city: string;
    country: string;
    is_liked: boolean;
    is_owner: boolean;
    name: string;
    pk: number;
    price: number;
    rating: number;
    thumb_photo: string;
}

export interface IRoom {
    id: number;
    owner: IPublicUser;
    rating: number;
    is_owner: boolean;
    thumb_photo: string;
    created_at: string;
    updated_at: string;
    name: string;
    country: string;
    city: string;
    price: number;
    rooms: number;
    toilets: number;
    descriptions: string;
    address: string;
    pet_friendly: boolean;
    kind: string;
    check_in_time: string;
    check_out_time: string;
    photos: IPhoto[];
}

export interface IPhoto {
    pk: number;
    file: string;
    description?: string;
}

export interface IPublicUser {
    pk: number;
    avatar?: string;
    username: string;
}

export interface IReview {
    payload: string;
    rating: number;
    user: IPublicUser | null;
    created_at: string;
}

export interface IMeUser {
    username: string;
    email: string;
    name: string;
    avatar?: string;
    is_host: boolean;
    gender: string;
    language: string;
    currency: string;
}

export interface IPasswordLoginForm {
    username: string;
    password: string;
}

export interface IPasswordSignupForm {
    email: string;
    username: string;
    password: string;
    passwordConfirm: string;
    result: string | null;
}

export interface IResponse extends AxiosResponse {
    data: {
        message?: string;
    };
}

export interface IError extends AxiosError {
    response: {
        status: number;
        data: {
            message?: string;
        };
    };
}

export interface ISignupError extends AxiosError {
    response: {
        status: number;
        data: {
            email?: string[];
            username?: string[];
        };
    };
}

export interface ICategory {
    pk: number;
    name: string;
}

export interface IAmenity {
    pk: number;
    name: string;
    description?: string;
}

export type IPhotos = Array<File | undefined | string>;

export interface ICreateRoom {
    name: string;
    address: string;
    descriptions: string;
    category: number;
    kind: string;
    country: string;
    city: string;
    price: number;
    rooms: number;
    toilets: number;
    pet_friendly: boolean;
    amenities: number[];
    check_in_time: string;
    check_out_time: string;
    photos: IPhotos;
}
