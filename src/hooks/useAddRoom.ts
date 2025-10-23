import React, {useEffect, useState} from "react";
import AddRoomRequest from "../types/AddRoomRequest";
import {UiState} from "../types/UiState";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import AddRoomResponse from "../types/AddRoomResponse";
import addRoom from "../api/rooms/addRoom";

export default function useAddRoom() {
    const [formData, setFormData] = useState<AddRoomRequest>({
        name: "",
        building: "",
        capacity: 0,
        floor: 0,
        whiteboard: false,
        projector: false,
        desks: false
    })

    const [uiState, setUiState] = useState<UiState>({
        loading: false,
        error: "",
        success: "",
        showAlert: false
    })

    const navigate = useNavigate()

    const handleAddRoom = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setUiState(prev => ({
            ...prev,
            loading: true
        }))

        try {
            const response: AddRoomResponse = await addRoom(formData)

            setUiState({
                loading: false,
                success: "Room added successfully!",
                error: "",
                showAlert: true
            })

            setFormData({
                name: "",
                building: "",
                capacity: 0,
                floor: 0,
                whiteboard: false,
                projector: false,
                desks: false
            });

        } catch (error){
            if(axios.isAxiosError(error)) {
                const errorMessage: string = error.response?.data?.message || "Adding room failed. Try again."
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
        const {name, type, value, checked} = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
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
        handleAddRoom,
        handleChange,
        handleClose
    }
}