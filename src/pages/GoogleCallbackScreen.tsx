import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useRef} from "react";
import {sendGoogleCode} from "../api/google/gapi";
import {useAuth} from "../context/AuthContext";

export default function GoogleCallbackScreen() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const codeSentRef = useRef(false);
    const { user } = useAuth();

    useEffect(() => {
        const code = searchParams.get("code");
        const returnTo = searchParams.get("state") || "/";

        if (code && !codeSentRef.current) {
            codeSentRef.current = true;

            const handleGoogleAuth = async () => {
                try {

                    if (!user || !user.id) {
                        console.error("Błąd: Brak zalogowanego użytkownika!");
                        return;
                    }

                    await sendGoogleCode(code, user.id);
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