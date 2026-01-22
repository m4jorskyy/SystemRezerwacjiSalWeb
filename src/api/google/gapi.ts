import api from "../api";

export const sendGoogleCode = async (code: string) => {
    const { data } = await api.post("/api/google/calendar/auth/", { code });
    return data;
};