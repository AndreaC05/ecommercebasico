import { Link } from "react-router-dom";
import "../style/Footer.css";
import LogoColor from "../assets/Logo_color.png";

const LINKS_TIENDA = [
  { label: "Colección",        to: "/coleccion" },
  { label: "Novedades",        to: "/novedades" },
  { label: "Ofertas",          to: "/ofertas" },
  { label: "Tallas especiales",to: "/tallas" },
];

const LINKS_AYUDA = [
  { label: "Cómo comprar",          to: "/como-comprar" },
  { label: "Envíos y devoluciones", to: "/envios" },
  { label: "Guía de tallas",        to: "/guia-tallas" },
  { label: "Preguntas frecuentes",  to: "/faq" },
];

const LINKS_CONTACTO = [
  { label: "WhatsApp",  to: "#", icono: "pi pi-whatsapp" },
  { label: "Email",     to: "#", icono: "pi pi-envelope" },
  { label: "Lima, Perú",to: "#", icono: "pi pi-map-marker" },
];

const REDES = [
  { label: "Instagram", icono: "pi pi-instagram", to: "#" },
  { label: "Facebook",  icono: "pi pi-facebook",  to: "#" },
  { label: "TikTok",    icono: "pi pi-tiktok",    to: "#" },
  { label: "WhatsApp",  icono: "pi pi-whatsapp",  to: "#" },
];

export default function Footer() {
  return (
    <footer className="footer">

      {/* ── Franja superior decorativa ── */}
      <div className="footer__stripe" />

      {/* ── Cuerpo principal ── */}
      <div className="footer__top">

        {/* Columna brand */}
        <div className="footer__brand">
          <Link to="/">
            <img src={LogoColor} alt="Logo" className="footer__logo" />
          </Link>
          <p className="footer__tagline">
            Calzado femenino exclusivo<br />
            <em>Hecho para mujeres que brillan</em>
          </p>

          {/* Redes sociales */}
          <div className="footer__social">
            {REDES.map((red) => (
              <a key={red.label} href={red.to} aria-label={red.label} className="footer__social-link">
                <i className={red.icono} />
              </a>
            ))}
          </div>

          {/* Badge de confianza */}
          <div className="footer__trust">
            <i className="pi pi-shield footer__trust-icon" />
            <span>Compra 100% segura · SSL certificado</span>
          </div>
        </div>

        {/* Columna Tienda */}
        <div className="footer__col">
          <h4 className="footer__col-title">Tienda</h4>
          <ul className="footer__col-list">
            {LINKS_TIENDA.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="footer__link">
                  <i className="pi pi-angle-right footer__link-arrow" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna Ayuda */}
        <div className="footer__col">
          <h4 className="footer__col-title">Ayuda</h4>
          <ul className="footer__col-list">
            {LINKS_AYUDA.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="footer__link">
                  <i className="pi pi-angle-right footer__link-arrow" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna Contacto */}
        <div className="footer__col">
          <h4 className="footer__col-title">Contacto</h4>
          <ul className="footer__col-list">
            {LINKS_CONTACTO.map((l) => (
              <li key={l.label}>
                <a href={l.to} className="footer__link">
                  <i className={`${l.icono} footer__contact-icon`} />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Horario */}
          <div className="footer__schedule">
            <p className="footer__schedule-title">
              <i className="pi pi-clock" /> Atención al cliente
            </p>
            <p>Lun – Vie: 9am – 7pm</p>
            <p>Sáb: 9am – 2pm</p>
          </div>
        </div>
      </div>

      {/* ── Divisor con métodos de pago ── */}
      <div className="footer__payments">
        <p className="footer__payments-label">Métodos de pago aceptados</p>
        <div className="footer__payments-list">
          <span className="footer__payment-badge">Visa</span>
          <span className="footer__payment-badge">Mastercard</span>
          <span className="footer__payment-badge">Yape</span>
          <span className="footer__payment-badge">Plin</span>
          <span className="footer__payment-badge">Transferencia</span>
          <span className="footer__payment-badge">Contra entrega</span>
        </div>
      </div>

      {/* ── Pie legal ── */}
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Tu Tienda. Todos los derechos reservados.</p>
        <div className="footer__bottom-links">
          <Link to="/privacidad">Política de privacidad</Link>
          <span>·</span>
          <Link to="/terminos">Términos y condiciones</Link>
        </div>
        <p className="footer__bottom-love">
          Diseñado con <i className="pi pi-heart-fill" /> para la mujer moderna
        </p>
      </div>

    </footer>
  );
}