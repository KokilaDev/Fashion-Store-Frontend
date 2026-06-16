import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

interface SocialLoginButtonsProps {
  onGoogleLogin: () => void;
  onFacebookLogin: () => void;
}

const SocialLoginButtons = ({
  onGoogleLogin,
  onFacebookLogin,
}: SocialLoginButtonsProps) => {
  return (
    <div className="social-container">

      <button className="google-btn" onClick={onGoogleLogin}>
        <FcGoogle size={22} />
      </button>

      <button className="facebook-btn" onClick={onFacebookLogin}>
        <FaFacebookF size={20} />
      </button>

    </div>
  );
};

export default SocialLoginButtons;