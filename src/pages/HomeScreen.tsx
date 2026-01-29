import { Link } from "react-router-dom";
import { CalendarDays, ArrowRight } from "lucide-react";

export default function HomeScreen() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-background">

            <div className="card max-w-md w-full text-center space-y-8">

                <div className="flex justify-center">
                    <div className="h-20 w-20 bg-indigo-50 rounded-full flex items-center justify-center shadow-inner">
                        <CalendarDays className="h-10 w-10 text-primary" />
                    </div>
                </div>

                <div>
                    <h1 className="heading-1 mb-3">Room Booking System</h1>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Manage your workspace efficiently. Book conference rooms, check availability, and schedule meetings in seconds.
                    </p>
                </div>

                <div className="space-y-4">
                    <Link to="/login" className="btn-primary group">
                        Log in
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <Link to="/register" className="btn-secondary">
                        Create new account
                    </Link>
                </div>
            </div>

            <p className="mt-8 text-xs text-gray-400">
                &copy; {new Date().getFullYear()} Room Booking System. All rights reserved.
            </p>
        </div>
    )
}