import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  //   Outlet,
  Navigate,
} from "react-router-dom";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Dashboard } from "./pages/Dashboard";
import { ToDo } from "./components/ToDo";
import { DataTable } from "./components/DataTable";

// ProtectedRoute component
const ProtectedRoute: React.FC<{
  isLoggedIn: boolean;
  children: React.ReactNode;
}> = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

import useAuthStore from "./store/useAuthStore";

const App = () => {
  const { isLoggedIn } = useAuthStore();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<ToDo />} />
          <Route path="todo" element={<ToDo />} />
          <Route path="users" element={<DataTable />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        {!isLoggedIn ? (
          <Route path="*" element={<Navigate to="/" replace />} />
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
