import React, { useState } from "react";
import "./Connexion.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Connexion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------------------
  // Connexion utilisateur
  // ---------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Validation simple
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
        setLoading(true);

    //verfier la connexion dans la session storage
   const storedUser = sessionStorage.getItem("user");
   if (!storedUser) {
      setLoading(false);
      setError("Aucun utilisateur trouvé. Veuillez vous inscrire d'abord.");
      return;
    }
    const user = JSON.parse(storedUser);
    
    if (user.email === email && user.password === password) {
     //suangarder l'état de connexion dans la session storage
      sessionStorage.setItem("isLogged", "true");
      setLoading(false);
      //redirect to home page
      window.location.href = "/Home";
    } else {
      setLoading(false);
      setError("Email ou mot de passe incorrect.");
    }
    };
    //Deconnexion
    const handleLogout = () => {
      sessionStorage.removeItem("isLogged");
       setEmail("");
      setPassword("");
      window.location.href = "/Connexion";
    };

  return (
    <div className="ls-page">
      <div className="ls-card">

        <button className="ls-logout"  onClick={handleLogout}>
          <i className="fa fa-arrow-left"></i>
        </button>

        <div className="ls-left">
          <div className="ls-illustration"></div>
        </div>

        <div className="ls-right">
          <h2 className="ls-title">Connexion</h2>
          <p className="ls-subtitle">Connectez-vous pour continuer.</p>

          {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

          <form className="ls-form" onSubmit={handleLogin}>

            <label className="ls-label">
              <span className="ls-icon">👤</span>
              <input 
                type="email" 
                className="ls-input"
                placeholder="Adresse Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="ls-label password-wrapper">
              <span className="ls-icon">🔒</span>

              <input
                type={showPassword ? "text" : "password"}
                className="ls-input"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="toggle-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </label>

            <div className="ls-remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Se souvenir de moi</label>
            </div>

            <button className="ls-button" type="submit">
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
          
          <a href="/Inscription" className="ls-create">Créer un nouveau compte</a>
          <div className="ls-or">Ou continuez avec</div>

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

export default Connexion;
