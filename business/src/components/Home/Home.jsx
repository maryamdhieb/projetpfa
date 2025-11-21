import React , { useEffect }  from "react";
import "./Home.css";
import NavBar from "../NavBar/NavBar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Product from "../Products/Product";
import cam from "../assets/img33.webp";
import elect from "../assets/elect1.jpg";

const images = [
  "logo_3M-150x83.png",
  "logo_AVS.png",
  "logo_CORNING.png",
  "logo_EATON.png",
  "logo_EEA.png",
  "logo_HIKVISION.png",
  "logo_INIM.png",
  "logo_LANDA.png",
  "logo_LEGRAND.png",
  "logo_lince.png",
  "logo_MASIERO.png",
  "logo_NUGELEC.png",
  "logo_OPTEX.png",
  "logo_PALAZZOLI.png",
  "logo_SLAMP.png",
];

const Home = () => {
  useEffect(() => {
  if (sessionStorage.getItem("isLogged") !== "true") {
    window.location.href = "/Connexion";
  }
}, []);

  return (
    <div className="home-container">
      <NavBar />

      {/* --- 🧭 HERO SLIDER --- */}
      <section className="hero-section">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          loop={true}
          slidesPerView={1}
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div
              className="slide-bg"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(228, 89, 34, 0.85) 0%, rgba(255,120,0,0.4) 30%, rgba(255,120,0,0) 60%), url(${cam})`,
              }}
            >
              <div className="slide-content">
                <h1>Leader</h1>
                <h1>de la sécurité électronique,</h1>
                <h1>de l’automatisme et du réseau,</h1>
                <h1>d’électricité et d’éclairage</h1>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div
              className="slide-bg"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(228, 89, 34, 0.85) 0%, rgba(255,120,0,0.4) 30%, rgba(255,120,0,0) 60%), url(${elect})`,
              }}
            >
              <div className="slide-content">
                <h4>Découvrez nos solutions</h4>
                <h1>Des technologies modernes et performantes</h1>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* --- 🌟 Logos qui défilent --- */}
      <section className="wd-marquee">
        <h2 className="marquee-title">Nos Marques</h2>
        <div className="wd-marquee-content">
          {images.map((img, index) => (
            <img
              key={index}
              src={require(`../assets/${img}`)}
              alt={`logo-${index}`}
              className="marque-logo"
            />
          ))}
        </div>
      </section>
       <section className="products-section">
        <Product />
      </section>
    </div>
  );
};

export default Home;
