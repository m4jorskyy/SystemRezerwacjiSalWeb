import useLogin from "../hooks/useLogin";
import Alert from "./Alert";
import {LoaderCircle} from "lucide-react";

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
                    <Alert message={uiState.success === "" ? uiState.error : uiState.success} type={"success"}/>
                </div>
            ) : null}
            <form onSubmit={handleLogin} className={"flex flex-col justify-center items-center"}>
                <input name={"email"} type={"email"} placeholder={"Email"} value={formData.email} onChange={handleChange}
                       required className={"text-center"}/>
                <input name={"password"} type={"password"} placeholder={"Password"} value={formData.password}
                       onChange={handleChange} required className={"text-center"}/>
                <input name={"submit"} type={"submit"} value={"Log In"} className={"cursor-pointer"}/>
            </form>
        </div>
    )
}