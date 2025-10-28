import {LoaderCircle} from "lucide-react";
import Alert from "./Alert";
import RoomCard from "./RoomCard";
import useFindRooms from "../hooks/useFindRooms";
import useEditReservation from "../hooks/useEditReservation";

export default function EditReservationForm() {
    const {
        formData,
        setFormData,
        uiState,
        handleEditReservation,
        handleChange,
        handleClose
    } = useEditReservation()

    const now = new Date()
    const minValue = now.toISOString().slice(0, 16)

    const {
        data: rooms,
        isLoading: isRoomsLoading,
        isError: isRoomError,
        error: roomsError,
        refetch: roomsRefetch
    } = useFindRooms(formData.startTime, formData.endTime)

    const enableFindRooms = !!formData.startTime && !!formData.startTime

    return (
        <div className={"flex flex-col justify-center items-center min-h-screen"}>
            {uiState.loading ? (
                <LoaderCircle className={"animate-spin"}/>
            ) : null}

            {uiState.showAlert ? (
                <div onClick={handleClose}>
                    <Alert message={uiState.success === "" ? uiState.error : uiState.success}
                           type={uiState.success === "" ? "error" : "success"}/>
                </div>
            ) : null}

            <form onSubmit={handleEditReservation}>
                <input name={"title"} type={"text"} value={formData.title} onChange={handleChange} placeholder={"Title"} required className={"text-center"}/>
                <input name={"startTime"} type={"datetime-local"} value={formData.startTime} min={minValue} onChange={handleChange} required className={"text-center"}/>
                <input name={"endTime"} type={"datetime-local"} value={formData.endTime} min={formData.startTime} onChange={handleChange} required className={"text-center"}/>

                <button onClick={() => roomsRefetch()} disabled={!enableFindRooms} title={enableFindRooms ? "Click to find available rooms!" : "Choose proper start time and end time of reservation!"} className={"cursor-pointer"}>Find rooms
                </button>

                {isRoomsLoading ? (
                    <LoaderCircle className={"animate-spin"}/>
                ) : null}

                {isRoomError ? (
                    <Alert message={roomsError.toString()} type={"error"}/>
                ) : null}

                <div className={"flex flex-col justify-center items-center gap-2"}>
                    {rooms?.map(room => (
                        <RoomCard {...room} onClick={() => setFormData(prev => ({...prev, roomId: room.id}))}/>
                    ))}
                </div>

                <input type={"submit"} value={"Edit reservation"} />
            </form>
        </div>
    )
}