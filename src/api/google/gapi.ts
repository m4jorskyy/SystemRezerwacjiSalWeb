import api from "../api";

export const sendGoogleCode = async (code: string) => {
    const { data } = await api.post("/api/google/auth/", { code });
    return data;
};