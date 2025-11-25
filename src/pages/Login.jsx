import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import styles from "./Login.module.css";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = useCallback(() => {
    const errs = {};
    if (!form.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [form]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!validate()) {
        toast.error("❌ Please fix validation errors");
        return;
      }
      setLoading(true);
      dispatch(loginUser(form))
        .unwrap()
        .then(() => {
          toast.success("✅ Logged in successfully");
          navigate("/posts"); // 👈 автоматичний перехід після логіну
        })
        .catch((err) => toast.error(`❌ ${err}`))
        .finally(() => setLoading(false));
    },
    [dispatch, form, validate, navigate]
  );

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={styles.input}
          autoComplete="email"
        />
        {errors.email && <div className={styles.error}>{errors.email}</div>}
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className={styles.input}
          autoComplete="current-password"
        />
        {errors.password && (
          <div className={styles.error}>{errors.password}</div>
        )}
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
