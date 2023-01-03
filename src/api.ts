import axios from "axios";
import config from "./config";
import { QueryFunctionContext } from "@tanstack/react-query";
import Cookie from "js-cookie";

const instance = axios.create({
    baseURL: config.host.url,
    withCredentials: true,
});

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
    return instance.get("users/me").then((res) => res.data);
};

export const getLogout = () => {
    const csrfToken = Cookie.get("csrftoken");
    return instance
        .post("users/logout", null, {
            headers: {
                "X-CSRFToken": csrfToken,
            },
        })
        .then((res) => res.data);
};
