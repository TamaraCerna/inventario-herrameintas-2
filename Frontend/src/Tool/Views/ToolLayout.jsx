import { Outlet } from "react-router-dom";

export default function ToolLayout() {
    return (
        <div className="container mx-auto">
            <Outlet />
        </div>
    );
}

