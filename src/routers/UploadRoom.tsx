import useHostOnlyPage from "../lib/useHostOnlyPage";
import useProtectedPage from "../lib/useProtectedPage";

export default function UploadRoom() {
    useProtectedPage();
    useHostOnlyPage();

    return <div>uplaod room</div>;
}
