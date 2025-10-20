import React, {useEffect, useState} from "react";
import {AddReservationRequest} from "../types/AddReservationRequest";
import {UiState} from "../types/UiState";
import {useNavigate} from "react-router-dom";

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

    //TODO handleAddReservation

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
        uiState,
        handleChange,
        handleClose,
    }
}