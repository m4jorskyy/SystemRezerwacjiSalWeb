import Room from "../types/Room";

interface RoomCardProps extends Room {
    onClick?: () => void;
}

export default function RoomCard({id, name, building, capacity, floor, whiteboard, projector, desks, onClick}: RoomCardProps) {
    return (
        <div
            className="flex flex-col justify-center items-center border rounded-lg p-4 hover:bg-gray-100 cursor-pointer transition mb-4"
            onClick={onClick}
        >
            <p>{name}</p>
            <p>{building}</p>
            <p>Capacity: {capacity}</p>
            <p>Floor: {floor}</p>
            <p>Whiteboard: {whiteboard ? "Yes" : "No"}</p>
            <p>Projector: {projector ? "Yes" : "No"}</p>
            <p>Desks: {desks ? "Yes" : "No"}</p>
        </div>
    );
}
