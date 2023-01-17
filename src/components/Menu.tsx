import {
    MenuList,
    Menu,
    MenuItem,
    MenuButton,
    Avatar,
    useToast,
    ToastId,
} from "@chakra-ui/react";
import { Logout } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { IMeUser } from "../types";
import { Link } from "react-router-dom";

export default function CMenu(user: IMeUser) {
    const queryClient = useQueryClient();
    const toast = useToast();
    const toastRef = useRef<ToastId>();
    const mutation = useMutation(Logout, {
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
            <MenuList>
                <MenuItem onClick={onLogout}>Log out</MenuItem>
                <Link to={"bookings"}>
                    <MenuItem>My Bookings</MenuItem>
                </Link>
                <Link to={"rooms/upload"}>
                    <MenuItem>Upload rooms</MenuItem>
                </Link>
            </MenuList>
        </Menu>
    );
}
