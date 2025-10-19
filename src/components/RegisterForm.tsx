import {LoaderCircle} from "lucide-react";
import useLogin from "../hooks/useLogin";
import Alert from "./Alert";
import useRegister from "../hooks/useRegister";

export default function RegisterForm(){
    const {
        formData,
        handleChange,
        handleClose,
    } = useRegister();

    return (
        <div className={"flex flex-col justify-center items-center min-h-screen"}>
            {formData.loading ? (
                <LoaderCircle className={"animate-spin"}/>
            ) : null}

            {formData.showAlert ? (
                <div onClick={handleClose}>
                    <Alert message={formData.success === "" ? formData.error : formData.success} type={"success"}/>
                </div>
            ) : null}

            <form className={"flex flex-col justify-center items-center"}>
                <input name={"firstName"} type={"text"} placeholder={"First name"} value={formData.firstName} onChange={handleChange} required className={"text-center"}/>
                <input name={"lastName"} type={"text"} placeholder={"Last name"} value={formData.lastName} onChange={handleChange} required className={"text-center"}/>
                <input name={"email"} type={"email"} placeholder={"Email"} value={formData.email} onChange={handleChange} required className={"text-center"}/>
                <input name={"password"} type={"password"} placeholder={"Password"} value={formData.password}
                       onChange={handleChange} required className={"text-center"}/>
                <input name={"submit"} type={"submit"} value={"Sign up"} className={"cursor-pointer"}/>
            </form>
        </div>
    )
}