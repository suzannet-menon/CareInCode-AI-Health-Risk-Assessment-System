import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
  email: "",
  password: ""
});

  const [errors, setErrors] = useState({});

  // ✅ FIXED HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    let err = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) err.email = "Invalid email";
    if (form.password.length < 8) err.password = "Min 8 characters";

    return err;
  };

  const handleSubmit = () => {
    const e = validate();

    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    alert("Login successful!");
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>Welcome Back</h2>
        <p className="login-sub">Login to continue</p>

        <div className="login-grid single">

          <div>
            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

        </div>

        <button className="btn-primary login-btn" onClick={handleSubmit}>
          Login
        </button>

        <p className="switch-auth">
          New here?{" "}
          <span onClick={() => navigate("/signup")}>
            Create account
          </span>
        </p>
      </motion.div>
    </div>
  );
}