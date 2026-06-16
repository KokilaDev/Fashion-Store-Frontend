import SocialLoginButtons from "./SocialLoginButtons";

interface LoginFormProps {
    email: string;
    password: string;

    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;

    onLogin: () => void;
    onGoRegister: () => void;
}

const LoginForm = ({
  email,
  password,
  setEmail,
  setPassword,
  onLogin,
  onGoRegister,
}: LoginFormProps) => {
  return (
    <div className="auth-card">
      <div className="auth-header">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Log in to your Aura account</p>
      </div>

      <div className="form-section">
        <input
          className="auth-input"
          placeholder="email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="auth-input"
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="auth-button" onClick={onLogin}>
        Login
      </button>

      <p className="auth-text">
        Don't have an account?{" "}
        <span className="auth-link" onClick={onGoRegister}>
          Register
        </span>
      </p>

      <div className="social-divider">
        <span>OR</span>
      </div>

      <SocialLoginButtons
        onGoogleLogin={() => console.log("Google login clicked")}
        onFacebookLogin={() => console.log("Facebook login clicked")}
      />
    </div>
  );
};

export default LoginForm;