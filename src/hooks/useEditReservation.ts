import {useEffect, useState} from "react";
import {AddReservationRequest} from "../types/AddReservationRequest";
import {UiState} from "../types/UiState";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {AddReservationResponse} from "../types/AddReservationResponse";
import editReservation from "../api/reservations/editReservation";
import {useAuth} from "../context/AuthContext";

export default function useEditReservation() {
    const [formData, setFormData] = useState<AddReservationRequest>({
        roomId: 0,
        userId: 0,
        startTime: "",
        endTime: "",
        title: ""
    })

    const { id: reservationId } = useParams()
    const numericReservationId = reservationId ? parseInt(reservationId, 10) : null

    const [uiState, setUiState] = useState<UiState>({
        loading: false,
        error: "",
        success: "",
        showAlert: false
    })

    const navigate = useNavigate()
    const { user } = useAuth()

    const handleEditReservation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!user) return
        if(!numericReservationId) return

        setUiState(prev => ({
            ...prev,
            loading: true
        }))

        try {
            const request: AddReservationRequest = {...formData, userId: user?.id}
            const response: AddReservationResponse = await editReservation(numericReservationId, request)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage: string = error.response?.data?.message || "Editing reservation failed. Try again."
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
        setFormData,
        uiState,
        handleEditReservation,
        handleChange,
        handleClose,
    }
}