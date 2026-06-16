import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";
import { forgotPassword } from "../../services/auth";
import "../../styles/auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email) return alert("Enter email!");

    try {
      await forgotPassword(email);

      // store email for next steps
      sessionStorage.setItem("resetEmail", email);

      alert("OTP sent to email!");
      navigate("/otp-verify");
    } catch (err) {
      console.error("Forgot password error:", err);
      alert("Failed to send OTP");
    }
  };

  return (
    <div className="auth-container">
      <ForgotPasswordForm
        email={email}
        setEmail={setEmail}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ForgotPassword;