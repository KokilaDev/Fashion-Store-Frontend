interface EditProfileFormProps {
  formData: any;
  handleInputChange: (
    field: string,
    value: string
  ) => void;
}

const EditProfileForm = ({
  formData,
  handleInputChange,
}: EditProfileFormProps) => {
  return (
    <>
      <div className="content profile-field">
        <label>Full Name</label>
        <input
          type="text"
          className="profile-editable-input"
          value={formData.name}
          onChange={(e) =>
            handleInputChange(
              "name",
              e.target.value
            )
          }
        />
      </div>

      <div className="content profile-field">
        <label>Email Address</label>
        <h2>{formData.email}</h2>
      </div>

      <div className="content profile-field">
        <label>Contact Number</label>
        <input
          type="text"
          className="profile-editable-input"
          value={formData.contact}
          onChange={(e) =>
            handleInputChange(
              "contact",
              e.target.value
            )
          }
        />
      </div>

      <div className="content profile-field">
        <label>Date of Birth</label>
        <input
          type="date"
          className="profile-editable-input"
          value={formData.dob}
          onChange={(e) =>
            handleInputChange(
              "dob",
              e.target.value
            )
          }
        />
      </div>
    </>
  );
};

export default EditProfileForm;