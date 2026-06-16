import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OTPVerification from "../../components/auth/OTPVerification";
import { verifyOTP } from "../../services/auth";
import "../../styles/auth.css";

const OTPVerify = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    const email = sessionStorage.getItem("resetEmail");

    if (!email) {
      alert("Email not found!");
      return;
    }

    if (!otp) {
      alert("Enter OTP!");
      return;
    }

    try {
      await verifyOTP(email, otp);

      sessionStorage.setItem("otpVerified", "true");

      alert("OTP Verified!");
      navigate("/reset-password");
    } catch (err) {
      console.error("OTP verification error:", err);
      alert("Invalid OTP");
    }
  };

  return (
    <div className="auth-container">
      <OTPVerification
        otp={otp}
        setOtp={setOtp}
        onVerify={handleVerify}
      />
    </div>
  );
};

export default OTPVerify;