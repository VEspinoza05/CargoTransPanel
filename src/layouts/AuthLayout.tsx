import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 border-2 border-black">
        <Outlet />
      </div>
    </div>
  );
}