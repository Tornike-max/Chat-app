import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { useUser } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  function handleLogout() {
    logout();
  }
  return (
    <div id="header--wrapper">
      {user ? (
        <>
          <span>{user.name}</span>
          <span onClick={handleLogout} className="header--link">
            <HiOutlineArrowRightOnRectangle />
          </span>
        </>
      ) : (
        <button onClick={() => navigate("/login")}>Login</button>
      )}
    </div>
  );
}
