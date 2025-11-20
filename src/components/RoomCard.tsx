import Room from "../types/Room";

interface RoomCardProps extends Room {
    onClick?: () => void;
    isSelected?: boolean;
}

export default function RoomCard({id, name, building, capacity, floor, whiteboard, projector, desks, onClick, isSelected}: RoomCardProps) {
    return (
        <div
            onClick={onClick}
            className={`
                card cursor-pointer transition-all duration-200 
                flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full
                ${isSelected
                ? "border-2 border-primary bg-indigo-50 ring-1 ring-primary shadow-md"
                : "hover:border-primary hover:shadow-md border-gray-200"
            }
            `}
        >
            <div>
                <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-primary">{name}</h3>
                    <span className="px-2 py-0.5 bg-background rounded text-xs font-semibold text-gray-600 border border-gray-200">
                        Capacity: {capacity}
                    </span>
                </div>

                <p className="text-sm text-gray-500">
                    Building: <span className="font-medium text-gray-700">{building}</span> • Floor: <span className="font-medium text-gray-700">{floor}</span>
                </p>
            </div>

            <div className="flex flex-wrap gap-2">
                {whiteboard && (
                    <span className="px-3 py-1 text-xs font-medium text-primary bg-indigo-50 border border-indigo-100 rounded-full">
                        Whiteboard
                    </span>
                )}
                {projector && (
                    <span className="px-3 py-1 text-xs font-medium text-primary bg-indigo-50 border border-indigo-100 rounded-full">
                        Projector
                    </span>
                )}
                {desks && (
                    <span className="px-3 py-1 text-xs font-medium text-primary bg-indigo-50 border border-indigo-100 rounded-full">
                        Desks
                    </span>
                )}

                {/* Opcjonalnie: Jeśli nic nie ma */}
                {!whiteboard && !projector && !desks && (
                    <span className="text-xs text-gray-400 italic">No equipment</span>
                )}
            </div>
        </div>
    );
}