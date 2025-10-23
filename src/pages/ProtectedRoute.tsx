import {useAuth} from "../context/AuthContext";
import {Navigate} from "react-router-dom";
import {LoaderCircle} from "lucide-react";

export default function ProtectedRoute({children}: {children: React.ReactElement}) {
    const { user, isLoading } = useAuth()

    if(isLoading) {
        return <LoaderCircle className={"animate-spin"}/>
    }

    if(user?.role !== "ADMIN"){
        return <Navigate to={"/login"}/>
    }

    return children
}