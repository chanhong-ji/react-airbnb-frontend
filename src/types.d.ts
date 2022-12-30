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
    user: IPublicUser;
    created_at: string;
}
