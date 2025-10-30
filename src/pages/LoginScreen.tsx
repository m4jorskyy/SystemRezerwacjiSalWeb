import LoginForm from "../components/LoginForm";
import {Link} from "react-router-dom";

export default function LoginScreen() {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Zaloguj się</h1>
                    <p className="text-gray-500 mt-2">Witaj z powrotem!</p>
                </div>

                <LoginForm />
                <Link to={"/"}>Go back</Link>
            </div>
        </div>
    )
}