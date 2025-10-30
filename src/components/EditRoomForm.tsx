import {LoaderCircle} from "lucide-react";
import Alert from "./Alert";
import useEditRoom from "../hooks/useEditRoom";
import {Link} from "react-router-dom";

export default function EditRoomForm() {
    const {
        formData,
        uiState,
        handleEditRoom,
        handleChange,
        handleClose
    } = useEditRoom()

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

            <form onSubmit={handleEditRoom} className={"flex flex-col justify-center items-center gap-2"}>
                <label htmlFor="name">Room name:</label>
                <input id="name" name={"name"} type={"text"} value={formData.name} onChange={handleChange} placeholder={"Room name"} required className={"text-center"} />

                <label htmlFor="building">Building name:</label>
                <input id="building" name={"building"} type={"text"} value={formData.building} onChange={handleChange} placeholder={"Building name"} required className={"text-center"} />

                <label htmlFor="capacity">Capacity:</label>
                <input id="capacity" name={"capacity"} type={"number"} value={formData.capacity} min={2} onChange={handleChange} placeholder={"Capacity"} required className={"text-center"} />

                <label htmlFor="floor">Floor:</label>
                <input id="floor" name={"floor"} type={"number"} value={formData.floor} onChange={handleChange} placeholder={"Floor"} required className={"text-center"} />

                <label htmlFor="whiteboard">
                    <input id="whiteboard" name={"whiteboard"} type={"checkbox"} checked={formData.whiteboard} onChange={handleChange} required className={"text-center"} />
                    Whiteboard
                </label>

                <label htmlFor="projector">
                    <input id="projector" name={"projector"} type={"checkbox"} checked={formData.projector} onChange={handleChange} required className={"text-center"} />
                    Projector
                </label>

                <label htmlFor="desks">
                    <input id="desks" name={"desks"} type={"checkbox"} checked={formData.desks} onChange={handleChange} required className={"text-center"} />
                    Desks
                </label>

                <input type={"submit"} value={"Add room"}/>
            </form>

            <Link to={"/menu"}>Go back</Link>
        </div>
    )
}