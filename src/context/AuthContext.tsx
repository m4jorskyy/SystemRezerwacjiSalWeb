import {useQuery, useQueryClient} from "@tanstack/react-query";
import getMe from "../api/auth/getMe";
import LoginResponse from "../types/LoginResponse";
import {createContext, useContext, useEffect, useState} from "react";

interface AuthContextType {
    user: LoginResponse | null
    isLoading: boolean
    setUser: (user: LoginResponse | null) => void
    logout: () => void
    refetchUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: { children: React.ReactNode }) {
    const queryClient = useQueryClient()
    const [user, setUser] = useState<LoginResponse | null>(null)

    const {data, isLoading, refetch} = useQuery({
        queryKey: ['getMe'],
        queryFn: getMe,
        retry: false,
        staleTime: Infinity
    })

    useEffect(() => {
        if(data) setUser(data)
    }, [data])

    const logout = () => {
        setUser(null)
        queryClient.clear()
    }

    const refetchUser = async () => {
        await refetch()
    }

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            setUser,
            logout,
            refetchUser
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

