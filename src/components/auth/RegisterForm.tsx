import React from "react";
import SocialLoginButtons from "./SocialLoginButtons";

interface RegisterFormProps {
  name: string;
  address: string;
  dob: string;
  contact: string;
  email: string;
  password: string;
  confirmPassword: string;

  setName: React.Dispatch<React.SetStateAction<string>>;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  setDob: React.Dispatch<React.SetStateAction<string>>;
  setContact: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;

  onRegister: () => void;
  onGoLogin: () => void;
}

const RegisterForm = ({
  name,
  address,
  dob,
  contact,
  email,
  password,
  confirmPassword,
  setName,
  setAddress,
  setDob,
  setContact,
  setEmail,
  setPassword,
  setConfirmPassword,
  onRegister,
  onGoLogin,
}: RegisterFormProps) => {
  return (
    <div className="auth-card">
      <div className="auth-header">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join Aura Fashion Store today</p>
      </div>

      <div className="form-section">
        <input
          className="auth-input"
          placeholder="full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="auth-input"
          placeholder="shipping address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="form-row">
        <input
          className="auth-input"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />

        <input
          className="auth-input"
          type="tel"
          placeholder="contact number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </div>

      <div className="form-section">
        <input
          className="auth-input"
          type="email"
          placeholder="email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="form-row">
          <input
            className="auth-input"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            className="auth-input"
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      <button className="auth-button" onClick={onRegister}>
        Register
      </button>

      <p className="auth-text">
        Already have an account?{" "}
        <span className="auth-link" onClick={onGoLogin}>
            Login
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

export default RegisterForm;