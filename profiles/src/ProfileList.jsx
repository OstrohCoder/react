import Profile from "./Profile";

const ProfileList = ({ users }) => {
  return (
    <div className="profile-list">
      {users.map((user, index) => (
        <Profile
          key={index}
          name={user.name}
          role={user.role}
          avatarUrl={user.avatarUrl}
        />
      ))}
    </div>
  );
};

export default ProfileList;
