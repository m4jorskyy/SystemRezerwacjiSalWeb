import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useRef} from "react";
import {sendGoogleCode} from "../api/google/gapi";

export default function GoogleCallbackScreen() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const codeSentRef = useRef(false);

    useEffect(() => {
        const code = searchParams.get("code");
        const returnTo = searchParams.get("state") || "/";

        if (code && !codeSentRef.current) {
            codeSentRef.current = true;

            const handleGoogleAuth = async () => {
                try {
                    await sendGoogleCode(code);
                    // Sukces! Przekieruj tam, skąd użytkownik przyszedł
                    navigate(returnTo, { replace: true });
                } catch (error) {
                    console.error("Błąd auth:", error);
                    // W razie błędu też wróć, ewentualnie pokaż komunikat
                    navigate(returnTo, { replace: true });
                }
            };

            handleGoogleAuth();
        }
    }, [searchParams, navigate]);

    return <div>Trwa łączenie z kalendarzem...</div>;
}