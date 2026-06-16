interface ResetPasswordFormProps {
    password: string;
    confirmPassword: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
    onReset: () => void;
}

const ResetPasswordForm = ({
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
  onReset,
}: ResetPasswordFormProps) => {
  return (
    <div className="auth-card">
      <h2>Reset Password</h2>

      <input
        className="auth-input"
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        className="auth-input"
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button className="auth-button" onClick={onReset}>
        Reset Password
      </button>
    </div>
  );
};

export default ResetPasswordForm;