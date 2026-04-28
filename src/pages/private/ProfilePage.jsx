import { useAuth } from "../../context/useAuth";

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="profile">
      <div className="profile__card">
        <h1 className="profile__title">Mi perfil</h1>
        <dl className="profile__list">
          <div className="profile__row">
            <dt>Nombre</dt>
            <dd>{user.name} {user.lastname}</dd>
          </div>
          <div className="profile__row">
            <dt>Email</dt>
            <dd>{user.email}</dd>
          </div>
          <div className="profile__row">
            <dt>Rol</dt>
            <dd className="profile__role">{user.role}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default ProfilePage;
