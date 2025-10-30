import {Link} from "react-router-dom";

export default function HomeScreen() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
        </div>
    )
}