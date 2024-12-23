import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth, Admin } from "@/layouts";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      <Route path="/unauthorized" element={<div>Unauthorized</div>} />
    </Routes>
  );
}

export default App;
