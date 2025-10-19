import {Link} from "react-router-dom";

export default function ReservationScreen() {
    return (
        <div>
            <Link to={"/new"}>Add reservation</Link>
        </div>
    )
}