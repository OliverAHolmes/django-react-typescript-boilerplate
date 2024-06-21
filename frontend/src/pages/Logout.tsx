import * as React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export const Logout = () => {
  const { logout, isLoggedIn } = useAuthStore();

  React.useEffect(() => {
    logout();
  }, [logout]);

  return <>{isLoggedIn && <Navigate to="/login" replace={true} />}</>;
};
