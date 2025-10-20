import useAddReservation from "../hooks/useAddReservation";
import {LoaderCircle} from "lucide-react";
import Alert from "./Alert";

export default function AddReservationForm() {
    const {
        formData,
        uiState,
        handleChange,
        handleClose,
    } = useAddReservation();

    const now = new Date()
    const minValue = now.toISOString().slice(0,16)

    return (
        <div className={"flex flex-col justify-center items-center min-h-screen"}>
            {uiState.loading ? (
                <LoaderCircle className={"animate-spin"}/>
            ) : null}
            {uiState.showAlert ? (
                <div onClick={handleClose}>
                    <Alert message={uiState.success === "" ? uiState.error : uiState.success} type={"success"}/>
                </div>
            ) : null}
            <form className={"flex flex-col justify-center items-center"}>
                <input name={"startTime"} type={"datetime-local"} value={formData.startTime} min={minValue} onChange={handleChange} required className={"text-center"} />
                <input name={"endTime"} type={"datetime-local"} value={formData.endTime} min={minValue} onChange={handleChange} required className={"text-center"} />
            </form>

            {/*TODO handleFindRooms*/}
            <button>Find rooms</button>
        </div>
    )
}