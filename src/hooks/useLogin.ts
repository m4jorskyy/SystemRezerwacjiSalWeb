import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function useLogin() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        loading: false,
        error: "",
        success: "",
        showAlert: false
    })

    const navigate = useNavigate()

    //TODO handleLogin

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleClose = () => {
        setFormData(prev => ({
            ...prev,
            showAlert: false,
            error: "",
            success: ""
        }))
    }

    useEffect(() => {
        if (formData.error) {
            const timeout = setTimeout(() => {
                handleClose()
            }, 3000)

            return () => clearTimeout(timeout)
        }
    }, [formData.error])

    useEffect(() => {
        if (formData.success) {
            const timeout = setTimeout(() => {
                handleClose()
                navigate("/menu")
            }, 3000)

            return () => clearTimeout(timeout)
        }
    }, [formData.success])

    return {
        formData,
        handleChange,
        handleClose,
    }
}