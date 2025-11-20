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
        <div className={"flex flex-col justify-center items-center h-[80vh]"}>
            {uiState.loading ? (
                <LoaderCircle className={"animate-spin"}/>
            ) : null}
            {uiState.showAlert ? (
                <div onClick={handleClose}>
                    <Alert message={uiState.success === "" ? uiState.error : uiState.success} type={uiState.success === "" ? "error" : "success"}/>
                </div>
            ) : null}
            <form onSubmit={handleLogin} className={"flex flex-col justify-center items-center card mb-10 mt-10"}>
                <label htmlFor="email" className={"label-text"}>
                    Email
                </label>
                <input name={"email"} type={"email"} placeholder={"e.g. test@test.com"} value={formData.email} onChange={handleChange}
                       required className={"input-field"}/>
                <br />
                <label htmlFor="password" className={"label-text"}>
                    Password
                </label>
                <input name={"password"} type={"password"} placeholder={"********"} value={formData.password}
                       onChange={handleChange} required className={"input-field"}/>
                <br />
                <input name={"submit"} type={"submit"} value={"Log In"} className={"btn-primary mb-2"} disabled={uiState.loading}/>
            </form>

            <Link to={"/"} className={"btn-secondary"}>Go back</Link>
        </div>
    )
}