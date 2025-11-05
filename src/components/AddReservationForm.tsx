import useAddReservation from "../hooks/useAddReservation";
import {LoaderCircle} from "lucide-react";
import Alert from "./Alert";
import useFindRooms from "../hooks/useFindRooms";
import RoomCard from "./RoomCard";
import {Link} from "react-router-dom";
import {useState} from "react";
import RoomFilterRequest from "../types/RoomFilterRequest";
import useDebounce from "../hooks/useDebounce";

export default function AddReservationForm() {
    const {
        formData,
        setFormData,
        uiState,
        handleAddReservation,
        handleChange,
        handleClose,
    } = useAddReservation();

    const now = new Date()
    const minValue = now.toISOString().slice(0, 16)

    const [extraFilters, setExtraFilters] = useState({
        capacity: 0,
        whiteboard: false,
        projector: false,
        desks: false
    })

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, type, value, checked} = e.target
        setExtraFilters(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    const minCapacity: number = 2

    const roomFilterRequest: RoomFilterRequest = {
        startTime: formData.startTime,
        endTime: formData.endTime,
        ...extraFilters
    }

    const debouncedRoomFilterRequest = useDebounce(roomFilterRequest, 1000)

    const {
        data: rooms,
        isLoading: isRoomsLoading,
        isError: isRoomError,
        error: roomsError
    } = useFindRooms(debouncedRoomFilterRequest)

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

            <form onSubmit={handleAddReservation} className={"flex flex-col justify-center items-center gap-4 rounded-lg border-2"}>
                <input name={"title"} type={"text"} value={formData.title} onChange={handleChange} placeholder={"Title"} required className={"text-center rounded-lg"}/>
                <input name={"startTime"} type={"datetime-local"} value={formData.startTime} min={minValue} onChange={handleChange} required className={"text-center"}/>
                <input name={"endTime"} type={"datetime-local"} value={formData.endTime} min={formData.startTime} onChange={handleChange} required className={"text-center"}/>
                <input name={"capacity"} type={"number"} min={minCapacity} value={extraFilters.capacity} onChange={handleFilterChange} placeholder={"e.g. 2"}/>

                <label htmlFor="whiteboard">
                    <input id="whiteboard" name={"whiteboard"} type={"checkbox"} checked={extraFilters.whiteboard} onChange={handleFilterChange}  className={"text-center"} />
                    Whiteboard
                </label>

                <label htmlFor="projector">
                    <input id="projector" name={"projector"} type={"checkbox"} checked={extraFilters.projector} onChange={handleFilterChange} className={"text-center"} />
                    Projector
                </label>

                <label htmlFor="desks">
                    <input id="desks" name={"desks"} type={"checkbox"} checked={extraFilters.desks} onChange={handleFilterChange} className={"text-center"} />
                    Desks
                </label>

                {isRoomsLoading ? (
                    <LoaderCircle className={"animate-spin"}/>
                ) : null}

                {isRoomError ? (
                    <Alert message={roomsError.toString()} type={"error"}/>
                ) : null}

                <div className={"flex flex-col justify-center items-center gap-2"}>
                    {rooms?.map(room => (
                        <RoomCard key={room.id} {...room} onClick={() => setFormData(prev => ({...prev, roomId: room.id}))}/>
                    ))}
                </div>

                <input type={"submit"} value={"Add reservation"} className={"cursor-pointer"} disabled={uiState.loading || isRoomsLoading || formData.roomId === 0}/>
            </form>

            <Link to={"/menu"}>Go back</Link>
        </div>
    )
}