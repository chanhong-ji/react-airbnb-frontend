import useMeUser from "./useMeUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useHostOnlyPage() {
    const navigate = useNavigate();
    const { isLoggedIn, meLoading, meUser } = useMeUser();

    useEffect(() => {
        if (!meLoading) {
            if (!isLoggedIn || !meUser?.is_host) {
                navigate("/");
            }
        }
    }, [meLoading]);
    return;
}
