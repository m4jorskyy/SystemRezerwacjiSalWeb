import {useQuery, useQueryClient} from "@tanstack/react-query";
import getMe from "../api/auth/getMe";
import LoginResponse from "../types/LoginResponse";
import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

interface AuthContextType {
    user: LoginResponse | null
    isLoading: boolean
    setUser: (user: LoginResponse | null) => void
    logout: () => void
    refetchUser: () => Promise<void>
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

    const refetchUser = async () => {
        // once you have /me endpoint, you’ll re-enable this
        console.warn("Refetch user not implemented yet");
    };

    // whenever user changes, persist in localStorage
    useEffect(() => {
        if (user) {
            localStorage.setItem("token", user.token);
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, isLoading, setUser, logout, refetchUser }}>
            {children}
        </AuthContext.Provider>
    );
}

// export function AuthProvider({children}: { children: React.ReactNode }) {
//     const queryClient = useQueryClient()
//     const [user, setUser] = useState<LoginResponse | null>(null)
//
//     const {data, isLoading, refetch} = useQuery({
//         queryKey: ['getMe'],
//         queryFn: getMe,
//         retry: false,
//         staleTime: Infinity
//     })
//
//     useEffect(() => {
//         if(data) setUser(data)
//     }, [data])
//
//     const logout = () => {
//         setUser(null)
//         queryClient.clear()
//     }
//
//     const refetchUser = async () => {
//         await refetch()
//     }
//
//     return (
//         <AuthContext.Provider value={{
//             user,
//             isLoading,
//             setUser,
//             logout,
//             refetchUser
//         }}
//         >
//             {children}
//         </AuthContext.Provider>
//     )
// }

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

