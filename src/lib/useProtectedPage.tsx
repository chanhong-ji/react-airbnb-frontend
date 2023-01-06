import useMeUser from "./useMeUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useProtectedPage() {
    const navigate = useNavigate();
    const { isLoggedIn, meLoading } = useMeUser();

    useEffect(() => {
        if (!meLoading && !isLoggedIn) {
            navigate("/");
        }
    }, [meLoading]);
    return;
}
