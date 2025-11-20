import LoginForm from "../components/LoginForm";

export default function LoginScreen() {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full">

                <div className="text-center mb-8">
                    <h1 className={"heading-1"}>Zaloguj się</h1>
                    <p className={"heading-2"}>Witaj z powrotem!</p>
                </div>

                <LoginForm />
            </div>
        </div>
    )
}