import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getMyDetails, login } from "../../services/auth";
import LoginForm from "../../components/auth/LoginForm";
import "../../styles/auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) return alert("Please fill all fields..!");

    try {
      const data = await login(email, password);

      if (data?.data?.accessToken) {
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);

        const res = await getMyDetails();
        setUser(res?.data);

        const role = res?.data?.roles;

        if (role?.includes("ADMIN")) navigate("/admin");
        else navigate("/");
      }
    } catch (err: any) {
      console.error("Login full error:", err);
      console.error("Response:", err?.response?.data);
      alert("Login failed..!");
    }
  };

  return (
    <div className="auth-container">
      <LoginForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        onLogin={handleLogin}
        onGoRegister={() => navigate("/register")}
      />
    </div>
  );
};

export default Login;