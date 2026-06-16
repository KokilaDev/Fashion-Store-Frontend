interface OTPVerificationProps {
    otp: string;
    setOtp: React.Dispatch<React.SetStateAction<string>>;
    onVerify: () => void;
}

const OTPVerification = ({ otp, setOtp, onVerify }: OTPVerificationProps) => {
  return (
    <div className="auth-card">
      <h2>OTP Verification</h2>
      <p>Enter OTP sent to your email</p>

      <input
        className="auth-input"
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button className="auth-button" onClick={onVerify}>
        Verify OTP
      </button>
    </div>
  );
};

export default OTPVerification;