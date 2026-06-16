interface ForgotPasswordFormProps {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    onSubmit: () => void;
}

const ForgotPasswordForm = ({ email, setEmail, onSubmit }: ForgotPasswordFormProps) => {
  return (
    <div className="auth-card">
      <h2>Forgot Password</h2>
      <p>Enter your email to receive OTP</p>

      <input
        className="auth-input"
        type="email"
        placeholder="email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button className="auth-button" onClick={onSubmit}>
        Send OTP
      </button>
    </div>
  );
};

export default ForgotPasswordForm;