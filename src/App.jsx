import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth, Admin } from "@/layouts";
import ProtectedRoute from "./ProtectedRoute";
import { Unauthorized } from "./pages/dashboard";
import { Unpermited } from "./pages/dashboard/unpermited";

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
      <Route path="/unauthorized" element={<Unauthorized/>} />
      <Route path="/unpermited" element={<Unpermited/>}/>
    </Routes>
  );
}

export default App;
