import Room from "../types/Room";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

interface RoomCardProps extends Room {
    onClick?: () => void;
    isSelected?: boolean;
    // Nowe, opcjonalne funkcje
    onEdit?: () => void;
    onDelete?: () => void;
}

export default function RoomCard({
                                     id,
                                     name,
                                     building,
                                     capacity,
                                     floor,
                                     whiteboard,
                                     projector,
                                     desks,
                                     onClick,
                                     isSelected,
                                     onEdit,
                                     onDelete
                                 }: RoomCardProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Sprawdzamy, czy karta ma być edytowalna
    const isEditable = onEdit && onDelete;

    return (
        <div
            onClick={onClick}
            className={`
                card relative cursor-pointer transition-all duration-200 
                flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full pr-10
                ${isSelected
                ? "border-2 border-primary bg-indigo-50 ring-1 ring-primary shadow-md"
                : "hover:border-primary hover:shadow-md border-gray-200"
            }
            `}
        >
            {/* --- MENU TRZYKROPKA --- */}
            {isEditable && (
                <div className="absolute top-3 right-3 z-20">
                    <button
                        onPointerDown={(e) => e.stopPropagation()} // Blokuje Drag
                        onClick={(e) => {
                            e.stopPropagation(); // Blokuje onClick karty (wybór)
                            setIsMenuOpen(!isMenuOpen);
                        }}
                        className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                    >
                        <MoreVertical className="w-5 h-5" />
                    </button>

                    {isMenuOpen && (
                        <div
                            onPointerDown={(e) => e.stopPropagation()}
                            className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-30 animate-in fade-in zoom-in-95 duration-100 origin-top-right"
                        >
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsMenuOpen(false);
                                    if (onEdit) onEdit();
                                }}
                                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                                <Pencil className="w-4 h-4" /> Edit
                            </button>

                            <div className="border-t border-gray-100"></div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsMenuOpen(false);
                                    if (onDelete) onDelete();
                                }}
                                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                                <Trash2 className="w-4 h-4" /> Delete
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* --- TREŚĆ KARTY --- */}
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

                {!whiteboard && !projector && !desks && (
                    <span className="text-xs text-gray-400 italic">No equipment</span>
                )}
            </div>
        </div>
    );
}