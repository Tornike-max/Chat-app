import Room from "./pages/Room";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./ui/PrivateRoute";
import { UserProvider } from "./context/UserAuthContext";
import RegisterPage from "./pages/RegisterPage";
// import { UserAuthContextProvider } from "./context/UserAuthContext";

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Room />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}
