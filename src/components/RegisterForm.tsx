import { LoaderCircle } from "lucide-react";
import Alert from "./Alert";
import useRegister from "../hooks/useRegister";
import { Link } from "react-router-dom";

export default function RegisterForm() {
    const {
        formData,
        uiState,
        handleRegister,
        handleChange,
        handleClose,
    } = useRegister();

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-4">

            {uiState.loading ? (
                <div className="fixed inset-0 bg-white/50 z-50 flex items-center justify-center">
                    <LoaderCircle className="animate-spin text-primary w-10 h-10" />
                </div>
            ) : null}

            {uiState.showAlert ? (
                <div onClick={handleClose} className="w-full max-w-md mb-4 cursor-pointer">
                    <Alert
                        message={uiState.success === "" ? uiState.error : uiState.success}
                        type={uiState.success === "" ? "error" : "success"}
                    />
                </div>
            ) : null}

            <form onSubmit={handleRegister} className="card space-y-6 w-full max-w-md">

                <div className="text-center border-b border-gray-200 pb-4 mb-4">
                    <h2 className="heading-1">Create Account</h2>
                    <p className="text-sm text-gray-500 mt-1">Join us to start booking rooms.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstname" className="label-text">First Name</label>
                        <input
                            id="firstname"
                            name="firstname"
                            type="text"
                            placeholder="e.g. John"
                            value={formData.username} // Utrzymuję Twoje powiązanie z 'username'
                            onChange={handleChange}
                            required
                            className="input-field"
                        />
                    </div>

                    <div>
                        <label htmlFor="lastname" className="label-text">Last Name</label>
                        <input
                            id="lastname"
                            name="lastname"
                            type="text"
                            placeholder="e.g. Doe"
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                            className="input-field"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="label-text">Email Address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john.doe@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="label-text">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>

                <div className="pt-2">
                    <input
                        name="submit"
                        type="submit"
                        value={uiState.loading ? "Signing up..." : "Sign Up"}
                        className="btn-primary cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                        disabled={uiState.loading}
                    />
                </div>

                <div className="text-center text-sm text-gray-500">
                    Already have an account? <Link to="/login" className="link">Log in</Link>
                </div>
            </form>

            <Link to="/" className="btn-secondary w-fit mt-6">Go back to Home</Link>
        </div>
    );
}