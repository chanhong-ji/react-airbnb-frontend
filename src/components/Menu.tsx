import {
    MenuList,
    Menu,
    MenuItem,
    MenuButton,
    Avatar,
    useToast,
    ToastId,
} from "@chakra-ui/react";

import { getLogout } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { IMeUser } from "../types";

export default function CMenu(user: IMeUser) {
    const queryClient = useQueryClient();
    const toast = useToast();
    const toastRef = useRef<ToastId>();
    const mutation = useMutation(getLogout, {
        onMutate: () => {
            toastRef.current = toast({
                title: "Loading...",
                description: "It takes a few seconds...",
                status: "loading",
            });
        },
        onSuccess: () => {
            if (toastRef.current) {
                toast.update(toastRef.current, {
                    title: "Log out",
                    duration: 4000,
                    description: "see you later!",
                    isClosable: true,
                    status: "success",
                });
                queryClient.refetchQueries(["me"]);
            }
        },
    });

    const onLogout = () => {
        mutation.mutate();
    };

    return (
        <Menu>
            <MenuButton>
                <Avatar src={user?.avatar} name={user?.username} />
            </MenuButton>
            <MenuList onClick={onLogout}>
                <MenuItem>Log out</MenuItem>
            </MenuList>
        </Menu>
    );
}
