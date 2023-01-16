import axios from "axios";
import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import {
    IBooking,
    IBookingCheck,
    ICreateRoom,
    IPasswordLoginForm,
    IPasswordSignupForm,
    IPhotos,
} from "./types.d";
import config from "./config";
import { formatDate } from "./lib/utils";

const instance = axios.create({
    baseURL: config.host.url,
    withCredentials: true,
});

const getCsrfHeader = () => {
    const csrfToken = Cookie.get("csrftoken");
    return {
        "X-CSRFToken": csrfToken,
    };
};

export const getRooms = () => instance.get("rooms/").then((res) => res.data);

export const getRoom = ({ queryKey }: QueryFunctionContext) => {
    const [_, roomPk] = queryKey;
    return instance.get(`rooms/${roomPk}`).then((res) => res.data);
};

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
    const [_, roomPk] = queryKey;
    return instance.get(`rooms/${roomPk}/reviews`).then((res) => res.data);
};

export const getMeUser = () => {
    return instance
        .get("users/me")
        .then((res) => res.data)
        .catch((error) => null);
};

export const Logout = () => {
    return instance
        .post("users/logout", null, {
            headers: {
                ...getCsrfHeader(),
            },
        })
        .then((res) => res.data);
};

export const getGithubLogin = (code: string) =>
    instance
        .post(
            "users/github",
            { code },
            {
                headers: {
                    ...getCsrfHeader(),
                },
            }
        )
        .then((res) => ({ status: res.status, data: res.data }))
        .catch((error) => {
            const response = error.response;
            return { status: response.status, data: response.data };
        });

export const getKakaoLogin = (code: string) =>
    instance
        .post(
            "users/kakao",
            { code },
            {
                headers: {
                    ...getCsrfHeader(),
                },
            }
        )
        .then((res) => ({ status: res.status, data: res.data }))
        .catch((error) => {
            const response = error.response;
            return { status: response.status, data: response.data };
        });

export const postPasswordLogin = (data: IPasswordLoginForm) =>
    instance
        .post("users/login", data, { headers: { ...getCsrfHeader() } })
        .then((res) => res);

export const postPasswordSignup = ({
    username,
    password,
    email,
}: IPasswordSignupForm) =>
    instance
        .post(
            "users/",
            { username, password, email },
            { headers: { ...getCsrfHeader() } }
        )
        .then((res) => res);

export const getCategoriesRoom = () =>
    instance.get("categories/room").then((res) => res.data);

export const getAmenities = () =>
    instance.get("rooms/amenities").then((res) => res.data);

export const postGetUrls = () =>
    instance
        .post("medias/photos/get-urls", null, {
            headers: { ...getCsrfHeader() },
        })
        .then((res) => res.data);

export const uploadPhotos = async (photos: IPhotos, urls: Array<string[]>) => {
    const photo_ids: string[] = [];

    for (let idx in photos) {
        const photo = photos[idx];
        if (photo) {
            const form = new FormData();
            form.append("file", photo);
            const data = await axios.post(urls[idx][1], form, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            const id = data.data.result.id;
            photo_ids.push(id);
        }
    }
    return photo_ids;
};

export const postPhotos = (urls: Array<string>) =>
    instance
        .post("medias/photos", { urls }, { headers: { ...getCsrfHeader() } })
        .then((res) => res.data);

export const postRooms = ({
    form,
    pks,
}: {
    form: ICreateRoom;
    pks: number[];
}) =>
    instance
        .post(
            "rooms/",
            { ...form, photos: pks },
            { headers: { ...getCsrfHeader() } }
        )
        .then((res) => res.data);

export const postBooking = ({
    roomPk,
    guests,
    check_in,
    check_out,
}: IBooking) =>
    instance
        .post(
            `rooms/${roomPk}/bookings`,
            { guests, check_in, check_out },
            { headers: { ...getCsrfHeader() } }
        )
        .then((res) => res.data);

export const getCheckBooking = ({
    queryKey,
}: QueryFunctionContext<IBookingCheck>) => {
    const [_, roomPk, dates] = queryKey;
    if (dates) {
        const checkIn = dates[0];
        const checkOut = dates[1];
        return instance
            .get(
                `rooms/${roomPk}/bookings/check?check_in=${formatDate(
                    checkIn
                )}&check_out=${formatDate(checkOut)}`
            )
            .then((res) => res.data)
            .catch(console.error);
    }
};

const getNextDate = (date: Date) => {
    let result = new Date();
    result.setDate(date.getDate() + 1);
    return result;
};
