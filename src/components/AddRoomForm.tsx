import useAddRoom from "../hooks/useAddRoom";
import {LoaderCircle} from "lucide-react";
import Alert from "./Alert";
import { Link } from "react-router-dom";

export default function AddRoomForm() {
    const {
        formData,
        uiState,
        handleAddRoom,
        handleChange,
        handleClose
    } = useAddRoom()

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

            <form onSubmit={handleAddRoom} className={"flex flex-col justify-center items-center"}>
                <label htmlFor="name">Room name:</label>
                <input id="name" name={"name"} type={"text"} value={formData.name} onChange={handleChange} placeholder={"Room name"} required className={"text-center"} />

                <label htmlFor="building">Building name:</label>
                <input id="building" name={"building"} type={"text"} value={formData.building} onChange={handleChange} placeholder={"Building name"} required className={"text-center"} />

                <label htmlFor="capacity">Capacity:</label>
                <input id="capacity" name={"capacity"} type={"number"} value={formData.capacity} min={2} onChange={handleChange} placeholder={"Capacity"} required className={"text-center"} />

                <label htmlFor="floor">Floor:</label>
                <input id="floor" name={"floor"} type={"number"} value={formData.floor} onChange={handleChange} placeholder={"Floor"} required className={"text-center"} />

                <label htmlFor="whiteboard">Whiteboard:</label>
                <input id="whiteboard" name={"whiteboard"} type={"checkbox"} checked={formData.whiteboard} onChange={handleChange} className={"text-center"} />

                <label htmlFor="projector">Projector:</label>
                <input id="projector" name={"projector"} type={"checkbox"} checked={formData.projector} onChange={handleChange} className={"text-center"} />

                <label htmlFor="desks">Desks:</label>
                <input id="desks" name={"desks"} type={"checkbox"} checked={formData.desks} onChange={handleChange} className={"text-center"} />

                <input type={"submit"} value={"Add room"}/>
            </form>

            <Link to={"/menu"}>Go back</Link>
        </div>
    )
}