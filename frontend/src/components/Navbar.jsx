import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="nav">
      <div className="nav-logo">CareInCode</div>

      <div className="nav-right">
        <button
          className="nav-signup"
          onClick={() => navigate("/login")}
        >
          Login
        </button>

        <button
          className="nav-signup"
          onClick={() => navigate("/signup")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}