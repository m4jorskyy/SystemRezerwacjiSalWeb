import {useEffect, useState} from "react";
import {UiState} from "../types/UiState";
import axios from "axios";
import deleteRoom from "../api/rooms/deleteRoom";

export default function useDeleteRoom() {
    const [uiState, setUiState] = useState<UiState>({
        loading: false,
        error: "",
        success: "",
        showAlert: false
    })

    const handleDelete = async (roomId: number) => {
        setUiState(prev => ({
            ...prev,
            loading: true
        }))

        try {
            await deleteRoom(roomId)
            setUiState({
                loading: false,
                success: "Room deleted successfully!",
                error: "",
                showAlert: true
            })

        } catch (error) {
            if(axios.isAxiosError(error)) {
                const errorMessage: string = error.response?.data?.message || "Deleting room failed. Try again."
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
            }, 3000)

            return () => clearTimeout(timeout)
        }
    }, [uiState.success])

    return {
        uiState,
        handleDelete,
        handleClose
    }
}