import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "../../styles/base.css";

const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("BackButton clicked");
    navigate(-1);
  };

  return (
    <button
      className="back-btn"
      onClick={handleClick}
    >
      <FaArrowLeft />
    </button>
  );
};

export default BackButton;