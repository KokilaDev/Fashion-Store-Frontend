interface ProfileCardProps {
  title: string;
  value: string;
}

const ProfileCard = ({
  title,
  value,
}: ProfileCardProps) => {
  return (
    <div className="content profile-field">
      <label>{title}</label>
      <h2>{value}</h2>
    </div>
  );
};

export default ProfileCard;