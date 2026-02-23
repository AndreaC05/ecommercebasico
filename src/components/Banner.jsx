import { useState, useEffect } from "react";
import "../style/Banner.css";
import Banner1 from "../assets/Banner1.png";
import Banner2 from "../assets/Banner2.png";
import Banner3 from "../assets/Banner3.png";
import BannerFondo1 from "../assets/BannerFondo.png";
import BannerFondo2 from "../assets/BannerFondo2.png";
import BannerFondo3 from "../assets/BannerFondo3.png";

const bannerImages = [Banner1, Banner2, Banner3];
const fondoImages  = [BannerFondo1, BannerFondo2, BannerFondo3];
const total        = bannerImages.length;

/*
  CARRUSEL CILÍNDRICO:
  - Cada tarjeta se rota en el eje Y a su ángulo fijo: i * (360/total)
  - Luego se translada hacia afuera en Z el radio del cilindro
  - El cilindro completo gira: rotateY(-activeIndex * 360/total)
  
  Radio = (ancho de tarjeta / 2) / tan(π / total)
  Con 3 tarjetas de 280px: R = 140 / tan(60°) ≈ 140/1.732 ≈ 242px
  Pero queremos un cilindro un poco más abierto, usamos R = 320px
*/

const CARD_W  = 420;
const CARD_H  = 520;
const ANGLE   = 360 / total;                        // 120°
const RADIUS  = Math.round((CARD_W / 2) / Math.tan(Math.PI / total)) + 80;

export default function Banner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fondoIndex,  setFondoIndex]  = useState(0);

  const goTo = (i) => setActiveIndex((i + total) % total);

  useEffect(() => {
    const t = setInterval(() => setActiveIndex(p => (p + 1) % total), 3600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setFondoIndex(p => (p + 1) % fondoImages.length), 4400);
    return () => clearInterval(t);
  }, []);

  // El cilindro gira en bloque: rotateY negativo por cada paso
  const cylinderRotation = -activeIndex * ANGLE;

  return (
    <section className="banner">

      {/* Fondos */}
      <div className="banner__backgrounds">
        {fondoImages.map((img, i) => (
          <div key={i}
            className={`banner__bg ${i === fondoIndex ? "banner__bg--active" : ""}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="banner__overlay" />
      </div>

      {/* Título arriba centrado */}
      <div className="banner__content">
        <p className="banner__subtitle">Bienvenidas</p>
        <h1 className="banner__title">Diseñado para mujeres que brillan</h1>
        <p className="banner__desc">Calzado femenino exclusivo</p>
      </div>

      {/* Carrusel cilíndrico */}
      <div className="banner__carousel">
        <div className="carousel__viewport">
          <div
            className="carousel__cylinder"
            style={{ transform: `translateZ(-${RADIUS}px) rotateY(${cylinderRotation}deg)` }}
          >
            {bannerImages.map((img, i) => (
              <div
                key={i}
                className="card"
                style={{
                  transform: `rotateY(${i * ANGLE}deg) translateZ(${RADIUS}px)`,
                }}
                onClick={() => goTo(i)}
              >
                <img src={img} alt={`Producto ${i + 1}`} draggable={false} />
                <div className="card__shine" />
              </div>
            ))}
          </div>
        </div>

        {/* Controles */}
        <div className="carousel__controls">
          <button className="carousel__btn" onClick={() => goTo(activeIndex - 1)} aria-label="Anterior">
            <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>Anterior</span>
          </button>

          <div className="carousel__dots">
            {bannerImages.map((_, i) => (
              <button key={i}
                className={`carousel__dot ${i === activeIndex ? "carousel__dot--active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <button className="carousel__btn" onClick={() => goTo(activeIndex + 1)} aria-label="Siguiente">
            <span>Siguiente</span>
            <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

    </section>
  );
}