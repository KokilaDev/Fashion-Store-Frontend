interface UserAvatarProps {
  name: string;
}

const UserAvatar = ({ name }: UserAvatarProps) => {
  const userInitial = name
    ? name.charAt(0).toUpperCase()
    : "A";

  return (
    <div className="profile-avatar">
      {userInitial}
    </div>
  );
};

export default UserAvatar;