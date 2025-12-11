import { AlertTriangle } from "lucide-react"; // Pamiętaj o imporcie ikony

interface ConfirmationCardProps {
    message: string;
    yesAction: () => void;
    noAction: () => void;
}

export default function ConfirmationCard({ message = "Are you sure?", yesAction, noAction }: ConfirmationCardProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">

            <div className="card w-full max-w-sm !p-6 shadow-2xl transform scale-100 animate-in zoom-in-95 duration-200 bg-white">

                <div className="text-center mb-6">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>

                    <h3 className="text-lg font-bold text-gray-900">Confirm Action</h3>
                    <p className="text-sm text-gray-500 mt-2">
                        {message}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={noAction}
                        className="btn-secondary"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={yesAction}
                        className="btn-primary !bg-red-600 hover:!bg-red-700 !ring-red-500"
                    >
                        Yes, delete
                    </button>
                </div>
            </div>
        </div>
    );
}