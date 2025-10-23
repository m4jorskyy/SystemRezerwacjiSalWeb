import {LoaderCircle} from "lucide-react";
import Alert from "./Alert";
import useRegister from "../hooks/useRegister";

export default function RegisterForm(){
    const {
        formData,
        uiState,
        handleRegister,
        handleChange,
        handleClose,
    } = useRegister();

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

            <form onSubmit={handleRegister} className={"flex flex-col justify-center items-center"}>
                <input name={"firstname"} type={"text"} placeholder={"First name"} value={formData.username} onChange={handleChange} required className={"text-center"}/>
                <input name={"lastname"} type={"text"} placeholder={"Last name"} value={formData.lastname} onChange={handleChange} required className={"text-center"}/>
                <input name={"email"} type={"email"} placeholder={"Email"} value={formData.email} onChange={handleChange} required className={"text-center"}/>
                <input name={"password"} type={"password"} placeholder={"Password"} value={formData.password}
                       onChange={handleChange} required className={"text-center"}/>
                <input name={"submit"} type={"submit"} value={"Sign up"} className={"cursor-pointer"}/>
            </form>
        </div>
    )
}