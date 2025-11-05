import React, {useEffect, useState} from "react";
import {AddReservationRequest} from "../types/AddReservationRequest";
import {UiState} from "../types/UiState";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import axios from "axios";
import addReservation from "../api/reservations/addReservation";
import {AddReservationResponse} from "../types/AddReservationResponse";

export default function useAddReservation() {
    const [formData, setFormData] = useState<AddReservationRequest>({
        roomId: 0,
        userId: 0,
        startTime: "",
        endTime: "",
        title: ""
    })

    const [uiState, setUiState] = useState<UiState>({
        loading: false,
        error: "",
        success: "",
        showAlert: false
    })

    const navigate = useNavigate()
    const { user } = useAuth()

    const handleAddReservation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!user) return;

        setUiState(prev => ({
            ...prev,
            loading: true
        }))

        try {
            const request: AddReservationRequest = {...formData, userId: user?.id}
            const response: AddReservationResponse = await addReservation(request)

            setUiState({
                loading: false,
                success: "Reservation added successfully!",
                error: "",
                showAlert: true
            })

            setFormData({
                roomId: 0,
                userId: 0,
                startTime: "",
                endTime: "",
                title: ""
            })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage: string = error.response?.data?.message || "Adding reservation failed. Try again."
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
                navigate("/menu")
            }, 3000)

            return () => clearTimeout(timeout)
        }
    }, [navigate, uiState.success])

    return {
        formData,
        setFormData,
        uiState,
        handleAddReservation,
        handleChange,
        handleClose,
    }
}