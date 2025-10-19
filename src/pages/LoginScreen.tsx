import LoginForm from "../components/LoginForm";
import {Link} from "react-router-dom";

export default function LoginScreen() {
    return (
        <div>
            <LoginForm />
            <Link to={"/"}>Go back</Link>
        </div>
    )
}