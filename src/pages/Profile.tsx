import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

import UserAvatar from "../components/profile/UserAvatar";
import ProfileCard from "../components/profile/ProfileCard";
import EditProfileForm from "../components/profile/EditProfileForm";
import AddressCard from "../components/profile/AddressCard";
import AddressForm from "../components/profile/AddressForm";
import BackButton from "../components/layouts/BackButton";
import "../styles/profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  
  const { user, setUser } = useAuth();

  const [isEditing, setIsEditing] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: user?.name || "",
      address: user?.address || "",
      dob: user?.dob || "",
      contact: user?.contact || "",
      email: user?.email || "",
    });

  const handleInputChange = (
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (setUser) {
      setUser({
        ...user,
        ...formData,
      });
    }

    setIsEditing(false);
  };

  return (
    <div className="box-container">
        <div className="profile-page-wrapper">

            <div className="profile-page-header">
                <BackButton />
                <h1 className="profile-page-title">
                My Profile
                </h1>
            </div>
            

            <div className="profile-card">

                <div className="profile-hero-header">
                    
                    <div className="profile-hero-background">
                        <UserAvatar
                            name={formData.name}
                        />

                        <div className="profile-header-text">
                            <h1 className="profile-title">
                            {formData.name}
                            </h1>

                            <p className="profile-member-tag">
                            Premium Store Account
                            </p>
                        </div>
                    </div>

                    <div className="profile-actions">

                        <button 
                            className="action-btn" 
                            onClick={() => {
                                navigate("/orders")
                                window.location.reload();
                            }}
                        >
                            <i className="fa-solid fa-bag-shopping"></i>
                        </button>

                        <button 
                            className="action-btn" 
                            onClick={() => {
                                navigate("/wishlist")
                                window.location.reload();
                            }}
                        >
                            <i className="fa-solid fa-heart"></i>
                        </button>

                        <button 
                            className="change-password-btn" 
                            onClick={() => {
                                navigate("/change-password")
                                window.location.reload();
                            }}
                        >
                            <i className="fa-solid fa-lock"></i>
                        </button>

                        <button 
                            className="logout-btn" 
                            onClick={() => {
                                navigate("/logout")
                                window.location.reload();
                            }}
                        >
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </button>

                    </div>

                </div>

                <hr className="profile-divider" />
                
                <div className="profile-content">
                    <div className="profile-info-section left-panel">

                        <div className="profile-stats">

                            <div className="stat-card">
                                <h2>12</h2>
                                <p>Orders</p>
                            </div>

                            <div className="stat-card">
                                <h2>8</h2>
                                <p>Wishlist</p>
                            </div>

                            <div className="stat-card">
                                <h2>3</h2>
                                <p>Addresses</p>
                            </div>

                        </div>

                    </div>

                    <hr className="profile-info-divider" />

                    <div className="profile-info-section right-panel">
                        <div className="profile-info-grid">

                            {isEditing ? (
                                <>
                                    <EditProfileForm
                                        formData={formData}
                                        handleInputChange={
                                            handleInputChange
                                        }
                                    />

                                    <AddressForm
                                        address={
                                            formData.address
                                        }
                                        onChange={(value) =>
                                            handleInputChange(
                                                "address",
                                                value
                                            )
                                        }
                                    />
                                </>
                            ) : (
                                <>
                                    <ProfileCard
                                        title="Full Name"
                                        value={
                                            formData.name ||
                                            "No Name Found"
                                        }
                                    />

                                    <ProfileCard
                                        title="Email Address"
                                        value={
                                            formData.email ||
                                            "No Email Found"
                                        }
                                    />

                                    <ProfileCard
                                        title="Contact Number"
                                        value={
                                            formData.contact ||
                                            "No Contact Found"
                                        }
                                    />

                                    <ProfileCard
                                        title="Date of Birth"
                                        value={
                                            formData.dob ||
                                            "No Date Found"
                                        }
                                    />

                                    <AddressCard
                                        address={
                                            formData.address
                                        }
                                    />
                                </>
                            )}

                        </div>

                        <div className="profile-actions-panel">
                            {isEditing ? (
                                <>
                                <button
                                    className="profile-btn-cancel"
                                    onClick={() =>
                                        setIsEditing(false)
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    className="profile-btn-save"
                                    onClick={handleSave}
                                >
                                    Save Changes
                                </button>
                                </>
                            ) : (
                                <button
                                className="profile-btn-edit"
                                onClick={() =>
                                    setIsEditing(true)
                                }
                                >
                                Edit Details
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Profile;