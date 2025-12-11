import { LoaderCircle } from "lucide-react";
import Alert from "./Alert";
import useEditRoom from "../hooks/useEditRoom";
import { Link } from "react-router-dom";

export default function EditRoomForm() {
    const {
        formData,
        uiState,
        handleEditRoom,
        handleChange,
        handleClose
    } = useEditRoom();

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-4">

            {uiState.loading ? (
                <div className="fixed inset-0 bg-white/50 z-50 flex items-center justify-center">
                    <LoaderCircle className="animate-spin text-primary w-10 h-10" />
                </div>
            ) : null}

            {uiState.showAlert ? (
                <div onClick={handleClose} className="w-full max-w-lg mb-4 cursor-pointer">
                    <Alert
                        message={uiState.success === "" ? uiState.error : uiState.success}
                        type={uiState.success === "" ? "error" : "success"}
                    />
                </div>
            ) : null}

            <form onSubmit={handleEditRoom} className="card space-y-6 w-full max-w-lg">

                <div className="border-b border-gray-200 pb-4 mb-4">
                    <h2 className="heading-1">Edit Room Details</h2>
                    <p className="text-sm text-gray-500 mt-1">Update information for this conference room.</p>
                </div>

                <div>
                    <label htmlFor="name" className="label-text">Room Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Conference Hall A"
                        required
                        className="input-field"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="building" className="label-text">Building Name</label>
                        <input
                            id="building"
                            name="building"
                            type="text"
                            value={formData.building}
                            onChange={handleChange}
                            placeholder="e.g. Main Office"
                            required
                            className="input-field"
                        />
                    </div>

                    <div>
                        <label htmlFor="floor" className="label-text">Floor</label>
                        <input
                            id="floor"
                            name="floor"
                            type="number"
                            value={formData.floor}
                            onChange={handleChange}
                            placeholder="e.g. 1"
                            required
                            className="input-field"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="capacity" className="label-text">Capacity</label>
                    <input
                        id="capacity"
                        name="capacity"
                        type="number"
                        value={formData.capacity}
                        min={2}
                        onChange={handleChange}
                        placeholder="e.g. 10"
                        required
                        className="input-field"
                    />
                </div>

                <div>
                    <span className="label-text mb-3 block">Available Equipment</span>
                    <div className="flex flex-wrap gap-6 p-4 bg-background rounded-lg border border-gray-200">

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                id="whiteboard"
                                name="whiteboard"
                                type="checkbox"
                                checked={formData.whiteboard}
                                onChange={handleChange}
                                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                            <span className="text-sm text-gray-700">Whiteboard</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                id="projector"
                                name="projector"
                                type="checkbox"
                                checked={formData.projector}
                                onChange={handleChange}
                                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                            <span className="text-sm text-gray-700">Projector</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                id="desks"
                                name="desks"
                                type="checkbox"
                                checked={formData.desks}
                                onChange={handleChange}
                                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                            <span className="text-sm text-gray-700">Desks</span>
                        </label>
                    </div>
                </div>

                <div className="pt-4">
                    <input
                        type="submit"
                        value={uiState.loading ? "Saving..." : "Save Changes"}
                        disabled={uiState.loading}
                        className="btn-primary cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                </div>
            </form>

            <Link to="/menu" className="btn-secondary w-fit mt-6 mb-8">Go back</Link>
        </div>
    );
}