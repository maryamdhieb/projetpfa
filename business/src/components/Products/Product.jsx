import React, { useState, useEffect } from "react";
import "./Product.css";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("Sécurité électronique");
  const [openCategory, setOpenCategory] = useState("Sécurité électronique");
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const subCategories = {
    "Sécurité électronique": [
      "Caméras de surveillance",
      "Alarmes antivol",
      "Contrôle d’accès",
      "Détection incendie et gaz",
      "Interphones et vidéophones"
    ],
    "Domotique et automatismes": [
      "Equipements de sonorisation",
      "Gestion de l’éclairage",
      "Gestion des ouvrants",
      "Portails et automatismes"
    ],
    "Électricité": [
      "Câbles électriques & spéciaux",
      "Eclairage",
      "Electricité industrielle",
      "Electricité des bâtiments",
      "Produits ATEX"
    ],
    "Réseau": [
      "Actif",
      "Passif"
    ]
  };

  const products = [
    {
      id: 1,
      name: "Kit Alarme sans fil AX-Pro",
      price: "111 TND",
      category: "Sécurité électronique",
      Desc:"Le Kit Alarme HIKVISION AX PRO DS-PWA64-KIT-WE est un système de sécurité sans fil intégrant les dernières technologies de Hikvision.", 
      brand: "Hikvision",
      image: "/SecuriteElectronique/alarme/KitAlarmesansfilAX-Pro.png",
      subCategories: ["Alarmes antivol"]
    },
    {
      id: 2,
      name: "Contact à encastrer blanc pour porte blindée",
      price: "149,50 TND",
      category: "Sécurité électronique",
      Desc:"Contact à encastrer blanc pour porte blindée, diamètre 20 mm, 4 fils de 30 cm, dimensions 29×20 mm, conforme EN50131-2-6 Grade 2 Class IV.",
      brand: "VIMO",
      image: "/SecuriteElectronique/alarme/Contactaencastrerblancpourporteblindee.png",
      subCategories: ["Alarmes antivol"]
    },
    {
      id: 3,
      name: "Télécommande Alarme – DS-PKF1-WB",
      price: "149,50 TND",
      category: "Sécurité électronique",
      Desc:"La Télécommande Alarme permet d’armer et de désarmer en mode séjour ou absence et de verrouiller/déverrouiller le clavier. Configurable à distance, elle offre une transmission fiable et une installation facile. Disponible en modèle DS-PKF1-WB.", 
      brand: "Hikvision",
      image: "/SecuriteElectronique/alarme/TelecommandeAlarme.png",
      subCategories: ["Alarmes antivol"]
    },
    {
      id: 4,
      name: "Détecteur extérieur 10m90 triple technologie",
      price: "220,00 TND",
      category: "Sécurité électronique",
      Desc:"Détecteur extérieur 10m/90° avec triple technologie (2 infrarouges + 1 hyperfréquence), protection contre le masquage et l’approche, ajustement à la température, immunité aux animaux, et certification IP54.", 
      brand: "EEA",
      image: "./SecuriteElectronique/alarme/Detecteurexterieur10m90tripletechnologie.png",
      subCategories: ["Alarmes antivol"]
    },
    {
      id: 5,
      name: "Détecteur Pet Immune câblé pour intérieur avec technologie infrarouge",
      price: "350,00 TND",
      category: "Sécurité électronique",
      Desc:"Détecteur Pet Immune câblé pour intérieur avec technologie infrarouge, portée 15m, compensation de température, protection contre la lumière blanche, compteur d’impulsions et protection anti-ouverture. Installation à 2,2m. Dimensions: 96x60x44mm. Grade 3 Classe II.",  
      brand: "INIM",
      image: "/SecuriteElectronique/alarme/DetecteurPetImmunecablepourinterieuravectechnologieinfrarouge.png",
      subCategories: ["Alarmes antivol"]
    },
    {
      id: 6,
      name: "Détecteur Infrarouge intérieur avec lentille tournante",
      price: "350,00 TND",
      category: "Sécurité électronique",
      Desc:"Détecteur infrarouge intérieur avec lentille tournante. Immunité aux animaux, haute performance avec lentille sphérique et logique SMDA. Portée jusqu’à 18 m en mode couloir. Indicateur LED visible. Installation à 2-3 m. Grade 2. Sensibilité de 1.6°C à 0.6 m/s. Modèle FLX-S-DT-X8. Dimensions H: 130 mm, L: 62 mm, l: 56 mm. Alimentation 12 mA à 12 V DC.", 
      brand: "OPTEX",
      image: "/SecuriteElectronique/alarme/DetecteurInfrarougeinterieuraveclentilletournante.png",
      subCategories: ["Alarmes antivol"]
    },
    {
      id: 7,
      name: "Détecteur extérieur linéaire IR",
      price: "350,00 TND",
      category: "Sécurité électronique",
      Desc:"Détecteur extérieur linéaire IR avec 4 pyroéléments, portée de 12 m de chaque côté. Fonctionnement indépendant, immunité environnementale et aux petits animaux. Indice de protection IP55, détection gauche/droite indépendante, hauteur d’installation de 0.8 à 1.2 m.", 
      brand: "OPTEX",
      image: "/SecuriteElectronique/alarme/DetecteurexterieurlineaireIR.png",
      subCategories: ["Alarmes antivol"]
    },
    {
      id: 8,
      name: "Détecteur bivolumétrique – infrarouge et hyperfréqence",
      price: "350,00 TND",
      category: "Sécurité électronique",
      Desc:"Détecteur bivolumétrique avec technologie infrarouge et hyperfréquence. Portée de 15 m, angle de 90°, 18 zones-4 plans, anti-masking, fonction MEMO, norme EN 50131-2-2 GRADE 2 CLASSE II.",
      brand: "EEA",
      image: "/SecuriteElectronique/alarme/Detecteurbivolumetrique.png",
      subCategories: ["Alarmes antivol"]
    }
  ];

  //  Filtrage complet catégorie + sous-catégorie
  const filteredProducts = products.filter((p) => {
    if (p.category !== selectedCategory) return false;

    if (selectedSubCategory) {
      return p.subCategories?.includes(selectedSubCategory);
    }

    return true;
  });

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null);

    if (openCategory === category) {
      setOpenCategory(null);
    } else {
      setOpenCategory(category);
    }
  };

  const handleSubCategoryClick = (sub) => {
    setSelectedSubCategory(sub);
  };
  const  [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState(() => {
    const saved = sessionStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

    // Charger le panier depuis sessionStorage au démarrage
    useEffect(() => {
      const storedCart = sessionStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }, []);

    // Ajouter un produit au panier
    const addToCart = (product) => {
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
      // Mettre aussi à jour le compteur dans le sessionStorage
      sessionStorage.setItem("cartCount", updatedCart.length);
    };
  return (
    <div className="products-page">

      {/* --- FILTRES --- */}
      <aside className="filter-panel">
        <h3>Filtrer</h3>

        <div className="filter-section">
          <h4>Catégorie</h4>

          <ul className="category-list">
            {Object.keys(subCategories).map((cat) => (
              <li key={cat}>
                <div
                  className="category-item"
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat} {openCategory === cat ? "▾" : "▸"}
                </div>

                {openCategory === cat && (
                  <ul className="sub-list">
                    {subCategories[cat].map((sub, index) => (
                      <li
                        key={index}
                        className={`sub-item ${selectedSubCategory === sub ? "active-sub" : ""}`}
                        onClick={() => handleSubCategoryClick(sub)}
                      >
                        {sub}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

        </div>
      </aside>

      {/* --- LISTE DES PRODUITS --- */}
      <main className="products-list">
        <div className="products-header">
          <h2>{selectedCategory}</h2>
          <p>
            {selectedSubCategory
              ? ` ${selectedSubCategory}`
              : "Tous les produits"}
          </p>

          
        </div>

        <div className="products-grid">
          {filteredProducts.length === 0 && (
            <p>Aucun produit trouvé.</p>
          )}

          {filteredProducts.map((p) => (
            <div key={p.id} className="product-card">
              <img
                src={p.image}
                alt={p.name}
                style={{
                  width: "267px",
                  height: "244px",
                  borderRadius: "21px"
                }}
              />
                
              <h3>{p.name}</h3>
              <p className="price">{p.price} <span>(HT)</span></p>
              <div className="product-actions">

              <button className="cart-animated"
                 title = "Ajouter au panier"
                 onClick={() => addToCart(p)}
                  >
                <i className="fas fa-cart-plus"></i>
              </button>
              <button 
              className="icon-circle view-btn"
              onClick={() => setSelectedProduct(p)}
              title = "Voir plus "
            >
              <i className="fas fa-chevron-down"></i> 
            </button>

            </div>
            </div>
          ))}
        </div>
        {selectedProduct && (
          <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
            <div className="mymodal-content" onClick={(e) => e.stopPropagation()}>
              
              <button className="close-btn" onClick={() => setSelectedProduct(null)}>
                ×
              </button>

              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name}
                className="modal-image"
              />

              <h2>{selectedProduct.name}</h2>
              <p><strong>Marque :</strong> {selectedProduct.brand}</p>
              <p><strong>Prix :</strong> {selectedProduct.price}</p>
              <p className="modal-desc">{selectedProduct.Desc}</p>

               <button className="cart-animated">
                <i className="fas fa-cart-plus"></i>
              </button>

            </div>
          </div>
        )}

      </main>

    </div>
  );
};

export default Products;
