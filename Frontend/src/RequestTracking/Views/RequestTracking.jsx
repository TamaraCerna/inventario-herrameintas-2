import { getAllRequests } from "../Services/RequestTrackingService";
import { useEffect, useState } from "react";

export default function RequestTracking() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        getRequests();
    }, []);

    const getRequests = async () => {
        try {
            const response = await getAllRequests();
            console.log(response);
            setRequests(response);
        } catch (error) {
            console.error("Error getting all requests", error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-center">Request Tracking</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests.map((request) => (
                    <div
                        key={request.id}
                        className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
                    >
                        <h2 className="text-lg font-semibold text-gray-800">
                            {request.requestType}
                        </h2>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Evaluation Result:</span>{" "}
                            {request.evaluationResult ? "Aprobado" : "Rechazado"}
                        </p>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Status:</span> {request.status}
                        </p>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Credit Type:</span>{" "}
                            {request.creditType}
                        </p>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">User:</span> {request.user.firstName} {request.user.lastName}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
