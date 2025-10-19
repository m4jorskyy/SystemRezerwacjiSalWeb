import {Link} from "react-router-dom";

export default function HomeScreen() {
    return (
        <div>
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
        </div>
    )
}