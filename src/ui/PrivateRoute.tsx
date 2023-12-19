import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserAuthContext";
import Spinner from "./Spinner";

export default function PrivateRoute() {
  const { user, loading } = useUser();

  if (loading || user === null) return <Spinner />;

  return <>{user ? <Outlet /> : <Navigate to="/login" />}</>;
}
