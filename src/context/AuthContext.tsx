import {useQueryClient} from "@tanstack/react-query";
import LoginResponse from "../types/LoginResponse";
import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

interface AuthContextType {
    user: LoginResponse | null
    isLoading: boolean
    setUser: (user: LoginResponse | null) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: { children: React.ReactNode }) {
    const queryClient = useQueryClient();
    const [user, setUser] = useState<LoginResponse | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const navigate = useNavigate()

    const isLoading = false; // no getMe endpoint yet, so skip loading states

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        queryClient.clear();
        navigate("/")
    };

    useEffect(() => {
        if (user) {
            localStorage.setItem("token", user.token);
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, isLoading, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

