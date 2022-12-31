import axios from "axios";
import config from "./config";
import { QueryFunctionContext } from "@tanstack/react-query";

const instance = axios.create({
    baseURL: config.host.url,
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
