import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";
import { resetPassword } from "../../services/auth";
import "../../styles/auth.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleReset = async () => {
    const email = sessionStorage.getItem("resetEmail");
    const otpVerified = sessionStorage.getItem("otpVerified");

    if (!email) {
      alert("Email not found!");
      return;
    }

    if (!otpVerified) {
      alert("OTP not verified!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await resetPassword(email, password);

      sessionStorage.clear();

      alert("Password reset successful!");
      navigate("/login");
    } catch (err) {
      console.error("Reset password error:", err);
      alert("Reset failed!");
    }
  };

  return (
    <div className="auth-container">
      <ResetPasswordForm
        password={password}
        confirmPassword={confirmPassword}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        onReset={handleReset}
      />
    </div>
  );
};

export default ResetPassword;