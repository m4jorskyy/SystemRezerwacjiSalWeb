import api from "../api";

export const sendGoogleCode = async (code: string) => {
    return await api.post("/api/google/calendar/auth/", { code });
};