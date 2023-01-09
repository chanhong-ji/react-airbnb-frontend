import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import ErrorPage from "./routers/ErrorPage";
import GithubConfirm from "./routers/GithubConfirm";
import Home from "./routers/Home";
import KakaoConfirm from "./routers/KaKaoConfirm";
import RoomDetail from "./routers/RoomDetail";
import UploadRoom from "./routers/UploadRoom";

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Root />,
            errorElement: <ErrorPage />,
            children: [
                { path: "", element: <Home /> },
                {
                    path: "rooms/upload",
                    element: <UploadRoom />,
                },
                { path: "rooms/:roomPk", element: <RoomDetail /> },
                {
                    path: "social",
                    children: [
                        { path: "github", element: <GithubConfirm /> },
                        { path: "kakao", element: <KakaoConfirm /> },
                    ],
                },
            ],
        },
    ]
    //   { basename: '' }
);
