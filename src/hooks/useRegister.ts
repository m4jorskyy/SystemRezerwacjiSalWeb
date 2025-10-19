import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {UiState} from "../types/UiState";
import RegisterRequest from "../types/RegisterRequest";

export default function useRegister() {
    const [formData, setFormData] = useState<RegisterRequest>({
        username: "",
        lastname: "",
        email: "",
        password: "",
    })

    const [uiState, setUiState] = useState<UiState>({
        loading: false,
        error: "",
        success: "",
        showAlert: false
    })

    const navigate = useNavigate()

    //TODO handleRegister

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleClose = () => {
        setUiState(prev => ({
            ...prev,
            showAlert: false,
            error: "",
            success: ""
        }))
    }

    useEffect(() => {
        if (uiState.error) {
            const timeout = setTimeout(() => {
                handleClose()
            }, 3000)

            return () => clearTimeout(timeout)
        }
    }, [uiState.error])

    useEffect(() => {
        if (uiState.success) {
            const timeout = setTimeout(() => {
                handleClose()
                navigate("/login")
            }, 3000)

            return () => clearTimeout(timeout)
        }
    }, [navigate, uiState.success])

    return {
        formData,
        uiState,
        handleChange,
        handleClose
    }
}