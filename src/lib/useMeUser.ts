import { IMeUser } from "./../types.d";
import { getMeUser } from "../api";
import { useQuery } from "@tanstack/react-query";

export default function useMeUser() {
    const { isLoading, data, isError } = useQuery<IMeUser>(["me"], getMeUser, {
        retry: false,
    });
    return {
        meLoading: isLoading,
        meUser: data,
        isLoggedIn: !isError,
    };
}
