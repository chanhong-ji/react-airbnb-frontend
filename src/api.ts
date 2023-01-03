import axios from "axios";
import config from "./config";
import { QueryFunctionContext } from "@tanstack/react-query";
import Cookie from "js-cookie";

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

export const getLogout = () => {
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
