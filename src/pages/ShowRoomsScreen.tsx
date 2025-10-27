import useShowRooms from "../hooks/useShowRooms";
import RoomCard from "../components/RoomCard";
import { motion } from "motion/react"
import {useState} from "react";

export default function ShowRoomsScreen(){
    //const { data: rooms, isLoading, isError, error} = useShowRooms()

    const rooms = [{
        id: 1,
        name: "Conference Room A",
        building: "Main Building",
        capacity: 10,
        floor: 2,
        whiteboard: true,
        projector: false,
        desks: true,
    },
    {
        id: 2,
        name: "Lecture Hall B",
        building: "Science Wing",
        capacity: 50,
        floor: 1,
        whiteboard: false,
        projector: true,
        desks: false,
    },
    {
        id: 3,
        name: "Small Meeting Room",
        building: "Annex",
        capacity: 4,
        floor: 3,
        whiteboard: true,
        projector: true,
        desks: true,
    }];

    const [activeDirection, setActiveDirection] = useState<"x" | "y" | null>(
        null
    )

    return(
        <div className={"flex flex-col justify-center items-center"}>
            {rooms?.map(room => (
                <motion.div key={room.id} drag
                dragDirectionLock
                onDirectionLock={(direction) => setActiveDirection(direction)}
                onDragEnd={() => setActiveDirection(null)}
                dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
                dragTransition={{ bounceStiffness: 500, bounceDamping: 15 }}
                dragElastic={0.6}
                whileDrag={{ cursor: "grabbing" }} className="cursor-grab active:cursor-grabbing">
                    <RoomCard key={room.id} id={room.id} name={room.name} building={room.building} capacity={room.capacity} floor={room.floor} whiteboard={room.whiteboard} projector={room.projector} desks={room.desks} />
                </motion.div>
            ))}
        </div>
    )
}