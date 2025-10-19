import RegisterForm from "../components/RegisterForm";
import {Link} from "react-router-dom";

export default function RegisterScreen() {
    return (
        <div>
            <RegisterForm />
            <Link to={"/"}>Go back</Link>
        </div>
    )
}