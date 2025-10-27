interface ConfirmationCardProps {
    message: string
    yesAction: () => void
    noAction: () => void
}

export default function ConfirmationCard({message = "Are you sure?", yesAction, noAction} : ConfirmationCardProps) {
    return (
        <div className={"flex flex-col justify-center items-center"}>
            <p>{message}</p>
            <div className={"flex flex-row justify-between"}>
                <button onClick={() => yesAction()}>Yes</button>
                <button onClick={() => noAction()}>No</button>
            </div>
        </div>
    )
}