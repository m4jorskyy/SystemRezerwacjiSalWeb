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
        <div className={"flex flex-col justify-center items-center min-h-screen mt-4"}>
            {uiState.loading ? (
                <LoaderCircle className={"animate-spin"}/>
            ) : null}

            {uiState.showAlert ? (
                <div onClick={handleClose}>
                    <Alert message={uiState.success === "" ? uiState.error : uiState.success}
                           type={uiState.success === "" ? "error" : "success"}/>
                </div>
            ) : null}

            <form onSubmit={handleAddReservation} className="card space-y-6 max-w-2xl mx-auto">
                <div>
                    <label htmlFor="title" className="label-text">
                        Reservation Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Board Meeting"
                        required
                        className="input-field"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="startTime" className="label-text">
                            Meeting Start
                        </label>
                        <input
                            id="startTime"
                            name="startTime"
                            type="datetime-local"
                            value={formData.startTime}
                            min={minValue}
                            onChange={handleChange}
                            required
                            className="input-field"
                        />
                    </div>

                    <div>
                        <label htmlFor="endTime" className="label-text">
                            Meeting End
                        </label>
                        <input
                            id="endTime"
                            name="endTime"
                            type="datetime-local"
                            value={formData.endTime}
                            min={formData.startTime}
                            onChange={handleChange}
                            required
                            className="input-field"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="capacity" className="label-text">
                        Minimum Capacity
                    </label>
                    <input
                        id="capacity"
                        name="capacity"
                        type="number"
                        min={minCapacity}
                        value={extraFilters.capacity}
                        onChange={handleFilterChange}
                        placeholder="e.g. 5"
                        className="input-field"
                    />
                </div>

                <div>
                    <span className="label-text mb-3 block">Required Equipment</span>
                    <div className="flex flex-wrap gap-6 p-4 bg-background rounded-lg border border-gray-200">

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="whiteboard"
                                checked={extraFilters.whiteboard}
                                onChange={handleFilterChange}
                                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                            <span className="text-sm text-gray-700">Whiteboard</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="projector"
                                checked={extraFilters.projector}
                                onChange={handleFilterChange}
                                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                            <span className="text-sm text-gray-700">Projector</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="desks"
                                checked={extraFilters.desks}
                                onChange={handleFilterChange}
                                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                            <span className="text-sm text-gray-700">Desks</span>
                        </label>
                    </div>
                </div>

                {isRoomsLoading ? (
                    <LoaderCircle className={"animate-spin"}/>
                ) : null}

                {isRoomError ? (
                    <Alert message={roomsError.toString()} type={"error"}/>
                ) : null}

                <div className={"flex flex-col justify-center items-center gap-2 w-full"}>
                    {rooms?.map(room => (
                        <RoomCard
                            key={room.id}
                            {...room}
                            onClick={() => setFormData(prev => ({...prev, roomId: room.id}))}
                            isSelected={formData.roomId === room.id}
                        />
                    ))}
                </div>

                <input
                    type={"submit"}
                    value={"Add reservation"}
                    className={"btn-primary"}
                    disabled={uiState.loading || isRoomsLoading || formData.roomId === 0}
                />
            </form>

            <Link to={"/menu"} className={"btn-secondary w-fit mt-4 mb-4"}>Go back</Link>
        </div>
    )
}