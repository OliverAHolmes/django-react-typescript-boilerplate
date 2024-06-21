import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
//   Outlet,
//   Navigate,
} from "react-router-dom";
// import { useSelector } from "react-redux";
// import { MapNotes } from "./Pages/MapNotes";
import { Login } from "./pages/Login";
// import { SignUp } from "./Pages/SignUp";
// import { Logout } from "./Pages/Logout";
// import { RootState } from "./redux/store";

// import { MapLibreContainer } from "./Components/MapLibreContainer";

// const ProtectedRoute: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
//   if (!isLoggedIn) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// };

const App = () => {
//   const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/maplibre" element={<MapLibreContainer />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<MapNotes />} />
        {isLoggedIn ? (
          <Route path="*" element={<Navigate to="/" replace />} />
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )} */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
