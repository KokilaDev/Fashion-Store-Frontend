import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/auth";
import RegisterForm from "../../components/auth/RegisterForm";
import "../../styles/auth.css";

const Register = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !address || !dob || !contact || !email || !password || !confirmPassword)
      return alert("Fill all fields!");

    if (password !== confirmPassword)
      return alert("Passwords do not match!");

    try {
      await register(name, address, dob, contact, email, password);
      alert("Success!");
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      alert("Registration failed!");
    }
  };

  return (
    <div className="auth-container">
      <RegisterForm
        name={name}
        address={address}
        dob={dob}
        contact={contact}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        setName={setName}
        setAddress={setAddress}
        setDob={setDob}
        setContact={setContact}
        setEmail={setEmail}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        onRegister={handleRegister}
        onGoLogin={() => navigate("/login")}
      />
    </div>
  );
};

export default Register;