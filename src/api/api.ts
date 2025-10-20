import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    }
})

api.interceptors.request.use(
    (config) => {
        const token: string = ""//TODO token storing
        const isEndpoint: boolean | undefined = config.url?.includes("/login") || config.url?.includes("/register")

        if(!isEndpoint && token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => Promise.reject(error)
)