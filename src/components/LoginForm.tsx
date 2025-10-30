import useLogin from "../hooks/useLogin";
import Alert from "./Alert";
import {LoaderCircle} from "lucide-react";
import {Link} from "react-router-dom";

export default function LoginForm() {
    const {
        formData,
        uiState,
        handleLogin,
        handleChange,
        handleClose,
    } = useLogin();

    return (
        <div className={"flex flex-col justify-center items-center min-h-screen"}>
            {uiState.loading ? (
                <LoaderCircle className={"animate-spin"}/>
            ) : null}
            {uiState.showAlert ? (
                <div onClick={handleClose}>
                    <Alert message={uiState.success === "" ? uiState.error : uiState.success} type={uiState.success === "" ? "error" : "success"}/>
                </div>
            ) : null}
            <form onSubmit={handleLogin} className={"flex flex-col justify-center items-center"}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                </label>
                <input name={"email"} type={"email"} placeholder={"e.g. test@test.com"} value={formData.email} onChange={handleChange}
                       required className={"text-center"}/>
                <br />
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                </label>
                <input name={"password"} type={"password"} placeholder={"********"} value={formData.password}
                       onChange={handleChange} required className={"text-center"}/>
                <br />
                <input name={"submit"} type={"submit"} value={"Log In"} className={"cursor-pointer"} disabled={uiState.loading}/>
            </form>

            <Link to={"/"}>Go back</Link>
        </div>
    )
}