import axios, {AxiosInstance} from "axios"

const api: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    }
})

api.interceptors.request.use(
    (config) => {
        const isEndpoint: boolean | undefined = config.url?.includes("/login") || config.url?.includes("/register") //check if url that api call uses contains /users/login or /users/register

        if(!isEndpoint) { //if url does not contain /login or /register and JWT token is up to date, include token that is stored in the cookie
            config.withCredentials = true
        }

        return config
    },
    (error) => Promise.reject(error) //if it is not returned, axios does not know that request call failed and try/catch later will not work
)

export default api