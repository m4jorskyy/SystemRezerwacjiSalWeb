import api from "../api";

export const sendGoogleCode = async (code: string, userId: number) => {
    const { data } = await api.post("/google/calendar/auth", { code, userId });
    return data;
};