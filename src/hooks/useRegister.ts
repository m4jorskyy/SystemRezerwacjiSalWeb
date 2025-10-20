import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {UiState} from "../types/UiState";
import RegisterRequest from "../types/RegisterRequest";
import axios from "axios";
import RegisterResponse from "../types/RegisterResponse";
import postRegister from "../api/auth/register";

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

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        if(e) e.preventDefault()
        setUiState(prev => ({
            ...prev,
            loading: true
        }))

        try {
            const data: RegisterResponse = await postRegister(formData)
            //TODO: username, role storing
            setUiState({
                loading: false,
                success: "Register successful!",
                error: "",
                showAlert: true
            })
        } catch (error) {
            if(axios.isAxiosError(error)) {
                const errorMessage: string = error.response?.data?.message || "Register failed. Try again."
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
        handleRegister,
        handleChange,
        handleClose
    }
}