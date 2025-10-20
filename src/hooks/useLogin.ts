import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import LoginRequest from "../types/LoginRequest";
import {UiState} from "../types/UiState";
import postLogin from "../api/auth/login";
import LoginResponse from "../types/LoginResponse";
import axios from "axios";

export default function useLogin() {
    const [formData, setFormData] = useState<LoginRequest>({
        email: "",
        password: ""
    })

    const [uiState, setUiState] = useState<UiState>({
        loading: false,
        error: "",
        success: "",
        showAlert: false
    })

    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        if(e) e.preventDefault()
        setUiState(prev => ({
            ...prev,
            loading: true
        }))

        try {
            const data: LoginResponse = await postLogin(formData)
            //TODO: username, role, JWT token storing
            setUiState({
                loading: false,
                success: "Login successful!",
                error: "",
                showAlert: true
            })
        } catch (error) {
            if(axios.isAxiosError(error)) {
                const errorMessage: string = error.response?.data?.message || "Login failed. Try again."
                setUiState({
                    loading: false,
                    success: "",
                    error: errorMessage,
                    showAlert: true
                })
            } else {
                setUiState({
                    loading: false,
                    success: "",
                    error: "Unexpected error. Try again.",
                    showAlert: true
                })
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleClose = () => {
        setUiState({
            loading: false,
            success: "",
            error: "",
            showAlert: false
        })
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
                navigate("/menu")
            }, 3000)

            return () => clearTimeout(timeout)
        }
    }, [navigate, uiState.success])

    return {
        formData,
        uiState,
        handleLogin,
        handleChange,
        handleClose,
    }
}