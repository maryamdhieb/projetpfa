import React, { useState } from 'react';
import './Inscription.css';

/*
  Composant LoginSignIn
  - Présente le formulaire d'inscription (inscription / sign in dans votre app)
  - Utilise useState pour gérer l'affichage du mot de passe (texte vs masqué)
  - Le composant est purement UI ici; la logique d'envoi (fetch/axios) sera ajoutée
    lors de l'intégration avec votre backend (ex: POST /api/register)
*/
const Inscription = (props) => {
  // État local pour afficher/masquer le mot de passe
  const [showPassword, setShowPassword] = useState(false);
  const[name , setName]= useState("");
  const[email , setEmail]= useState("");
  const[password , setPassword]= useState("");
  const[message , setMessage]= useState("");
  // Bascule l'état showPassword lorsque l'utilisateur clique sur l'icône 'œil'
  const togglePassword = () => setShowPassword(s => !s);
  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setMessage("Veuillez remplir tous les champs.");
      return;
    }
    //enregistrer l'utilisateur dans la session storage
    const userData = { name, email, password };
    sessionStorage.setItem("user", JSON.stringify(userData));
    setMessage("Inscription réussie ! Vous pouvez maintenant vous connecter.");
    setTimeout(() => {
      window.location.href = "/Connexion";
    });
  };
  // Rendu du composant
  return (
    <div className="ls-page">
      <div className="ls-card">
        {/* Partie gauche : illustration / logo */}
        <div className="ls-left">
          {/* la classe .ls-illustration applique l'image de fond (logo) via CSS */}
          <div className="ls-illustration" />
        </div>

        {/* Partie droite : formulaire d'inscription */}
        <div className="ls-right">
          <h2 className="ls-title">Inscription</h2>
          <p className="ls-subtitle">Créez un compte pour accéder à tous les services</p>

          {message && (
            <p style={{ color: message.includes("succès") ? "green" : "red" }}>
              {message}
            </p>
          )}

          <form className="ls-form" onSubmit={handleRegister}>
            {/* Nom complet */}
            <label className="ls-label">
              <span className="ls-icon">👤</span>
              <input className="ls-input" type="text" placeholder="Nom complet" onChange={(e)=> setName(e.target.value)}/>
            </label>

            {/* Adresse e-mail */}
            <label className="ls-label">
              <span className="ls-icon">📧</span>
              <input className="ls-input" type="email" placeholder="Adresse e-mail" onChange={(e) => setEmail(e.target.value)} />
            </label>

            {/* Mot de passe avec toggle afficher/masquer */}
            <label className="ls-label password-label">
              <span className="ls-icon">🔒</span>
              <div className="password-wrapper">
                {/* type dépend de showPassword */}
                <input
                  className="ls-input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mot de passe"
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/* Bouton qui ne soumet pas le formulaire (type="button")
                    et qui change l'état local pour afficher/masquer */}
                <button
                  type="button"
                  className="toggle-eye"
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  onClick={togglePassword}
                >
                  {/* Icônes SVG : deux variantes suivant l'état */}
                  {showPassword ? (
                    <svg className="eye-icon" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M2 2l20 20-1.5 1.5L17.6 20C15.8 20.7 14 21 12 21c-7 0-11-7-11-7 1.2-2.1 3-3.9 5.1-5.1L3.5 3.5 2 2z" />
                      <path d="M9.9 9.9A3 3 0 0 0 14.1 14.1" />
                    </svg>
                  ) : (
                    <svg className="eye-icon" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </label>

            {/* Bouton d'enregistrement - ici handler onSubmit à ajouter si besoin */}
            <button type="submit" className="ls-button">Enregistrer</button>

            {/* Lien vers la page de connexion si l'utilisateur a déjà un compte */}
            <a className="ls-create" href="/Connexion">Vous avez déjà un compte ? <strong>Connexion</strong></a>
          </form>

          {/* Boutons sociaux (UI seulement) */}
          <div className="ls-socials">
            <button className="social facebook"><i className="fab fa-facebook-f"></i></button>
            <button className="social twitter"><i className="fab fa-twitter"></i></button>
            <button className="social google"><i className="fab fa-google"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inscription;
