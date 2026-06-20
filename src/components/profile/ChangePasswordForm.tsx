const ChangePasswordForm = () => {
  return (
    <div className="change-password-form">
      <h3>Change Password</h3>

      <input
        type="password"
        placeholder="Current Password"
      />

      <input
        type="password"
        placeholder="New Password"
      />

      <input
        type="password"
        placeholder="Confirm Password"
      />

      <button>
        Update Password
      </button>
    </div>
  );
};

export default ChangePasswordForm;