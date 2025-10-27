import {useEffect, useState} from "react";
import {UiState} from "../types/UiState";
import {useNavigate, useParams} from "react-router-dom";
import AddRoomResponse from "../types/AddRoomResponse";
import axios from "axios";
import AddRoomRequest from "../types/AddRoomRequest";
import editRoom from "../api/rooms/editRoom";
import getRoomById from "../api/rooms/getRoomById";
import {useQueryClient} from "@tanstack/react-query";
import Room from "../types/Room";

export default function useEditRoom(){
    const [formData, setFormData] = useState<AddRoomRequest>({
        name: "",
        building: "",
        capacity: 0,
        floor: 0,
        whiteboard: false,
        projector: false,
        desks: false
    })

    const { id: roomId } = useParams()
    const numericRoomId = roomId ? parseInt(roomId, 10) : null

    const [uiState, setUiState] = useState<UiState>({
        loading: false,
        error: "",
        success: "",
        showAlert: false
    })

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const handleEditRoom = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setUiState(prev => ({
            ...prev,
            loading: true
        }))

        try {
            if(!numericRoomId) return
            const response: AddRoomResponse = await editRoom(numericRoomId, formData)

            setUiState({
                loading: false,
                success: "Room edited successfully!",
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
                const errorMessage: string = error.response?.data?.message || "Editing room failed. Try again."
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
        setUiState({
            loading: false,
            success: "",
            error: "",
            showAlert: false
        })
    }

    useEffect(() => {
        const fetchRoom = async () => {
            if (!numericRoomId) return;
            const data: Room = await getRoomById(numericRoomId);
            setFormData({
                name: data.name,
                building: data.building,
                capacity: data.capacity,
                floor: data.floor,
                whiteboard: data.whiteboard,
                projector: data.projector,
                desks: data.desks,
            });
        };
        fetchRoom();
    }, [numericRoomId]);

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
            const timeout = setTimeout(async () => {
                await queryClient.invalidateQueries({ queryKey: ['showRooms'] });
                handleClose()
                navigate("/rooms")
            }, 3000)

            return () => clearTimeout(timeout)
        }
    }, [queryClient, navigate, uiState.success])

    return {
        formData,
        uiState,
        handleEditRoom,
        handleChange,
        handleClose
    }
}