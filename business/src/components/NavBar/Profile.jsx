
import React, { useEffect, useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);

  // Récupérer les données de l'utilisateur depuis sessionStorage
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Si pas de session, rediriger vers la page de connexion
      window.location.href = "/Connexion";
    }
  }, []);

  // Déconnexion : vider sessionStorage et rediriger
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.setItem("isLogged", "false");
    window.location.href = "/Connexion";
  };

  if (!user) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>Profil Utilisateur</h2>
        <p><strong>Nom :</strong> {user.name}</p>
        <p><strong>Email :</strong> {user.email}</p>

        <button className="logout-button" onClick={handleLogout}>
          Se Déconnecter
        </button>
      </div>
    </div>
  );
};

export default Profile;
