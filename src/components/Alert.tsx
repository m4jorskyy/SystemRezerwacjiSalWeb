//Alert.jsx

import {AlertTriangle, CheckCircle2, XCircle, Info} from "lucide-react";

type AlertType = "error" | "success" | "info" | "warning"

interface AlertProps {
    type?: AlertType
    message: string
}

export default function Alert({type = "info", message} : AlertProps) {
    const styles = {
    error: {
      icon: <XCircle className="w-5 h-5 text-red-500" />,
      border: "border-red-600",
    },
    success: {
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
      border: "border-green-600",
    },
    warning: {
      icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
      border: "border-yellow-600",
    },
    info: {
      icon: <Info className="w-5 h-5 text-blue-500" />,
      border: "border-blue-600",
    },
  };

    return (
        <div
            className={`flex items-center gap-3 px-4 py-3 m-4 rounded-md shadow-md 
                  bg-[#140000]-900 border-2 ${styles[type].border}
                  animate-slideIn`}
        >
            {styles[type].icon}
            <span className="flex-1 whitespace-pre-line">{message}</span>
        </div>
    )

}