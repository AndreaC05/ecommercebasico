import Banner from "../components/Banner";
import "../style/Home.css";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-pink/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

/* ─── Datos placeholder — reemplaza con tus productos reales ─── */

const CATEGORIAS = [
  { id: 1, nombre: "Tacones",   icono: "👠", descripcion: "Elegancia que se siente" },
  { id: 2, nombre: "Flats",     icono: "🥿", descripcion: "Comodidad sin renunciar al estilo" },
  { id: 3, nombre: "Sandalias", icono: "👡", descripcion: "Ligereza para cada ocasión" },
  { id: 4, nombre: "Botas",     icono: "👢", descripcion: "Tendencia en cada temporada" },
];

const PRODUCTOS_DESTACADOS = [
  { id: 1, nombre: "Stiletto Perla",    precio: 189, precioAntes: 230, nuevo: true,  oferta: false },
  { id: 2, nombre: "Sandalia Dorada",   precio: 145, precioAntes: null,nuevo: false, oferta: false },
  { id: 3, nombre: "Flat Charol Negro", precio: 120, precioAntes: 160, nuevo: false, oferta: true  },
  { id: 4, nombre: "Bota Chelsea Rose", precio: 215, precioAntes: null,nuevo: true,  oferta: false },
];

const TESTIMONIOS = [
  { id: 1, nombre: "Valentina R.", ciudad: "Lima",     stars: 5, texto: "La calidad es increíble, los zapatos llegaron perfectos y el empaque es muy elegante." },
  { id: 2, nombre: "Claudia M.",   ciudad: "Arequipa", stars: 5, texto: "Llevé los stilettos a mi matrimonio y recibí halagos toda la noche. ¡Los amo!" },
  { id: 3, nombre: "Sofía T.",     ciudad: "Trujillo", stars: 5, texto: "Primera compra y quedé encantada. La atención es excelente y las tallas son exactas." },
];

const BENEFICIOS = [
  { icono: "pi pi-truck",    titulo: "Envío a todo el país", desc: "Despacho en 24–48 h a nivel nacional" },
  { icono: "pi pi-refresh",  titulo: "Cambios sin costo",    desc: "30 días para cambiar tu talla sin preguntas" },
  { icono: "pi pi-shield",   titulo: "Compra segura",        desc: "Pago 100% seguro con SSL certificado" },
  { icono: "pi pi-star",     titulo: "Calidad garantizada",  desc: "Materiales premium en cada par" },
];

/* ─── Estrellas ─── */
const Stars = ({ count }) => (
  <span className="home-stars">
    {Array.from({ length: 5 }, (_, i) => (
      <i key={i} className={`pi ${i < count ? "pi-star-fill" : "pi-star"}`} />
    ))}
  </span>
);

/* ─── Tarjeta de producto ─── */
const ProductCard = ({ producto }) => (
  <div className="home-product-card">
    <div className="home-product-img">
      <div className="home-product-img-placeholder" />
      <div className="home-product-badges">
        {producto.nuevo  && <span className="badge badge--new">Nuevo</span>}
        {producto.oferta && <span className="badge badge--sale">Oferta</span>}
      </div>
      <div className="home-product-actions">
        <button className="home-product-action" aria-label="Favoritos">
          <i className="pi pi-heart" />
        </button>
        <button className="home-product-action" aria-label="Vista rápida">
          <i className="pi pi-eye" />
        </button>
      </div>
    </div>
    <div className="home-product-info">
      <h3 className="home-product-name">{producto.nombre}</h3>
      <div className="home-product-price">
        <span className="price-current">S/ {producto.precio}</span>
        {producto.precioAntes && (
          <span className="price-before">S/ {producto.precioAntes}</span>
        )}
      </div>
      <Button label="Agregar al carrito" icon="pi pi-shopping-bag" className="home-product-btn p-button-sm" />
    </div>
  </div>
);

/* ─── HOME ─── */
export default function Home() {
  return (
    <>
      {/* 1 ── HERO BANNER */}
      <Banner />

      {/* 2 ── BARRA DE BENEFICIOS */}
      <section className="home-benefits">
        {BENEFICIOS.map((b, i) => (
          <div key={i} className="home-benefit-item">
            <i className={`${b.icono} home-benefit-icon`} />
            <div>
              <p className="home-benefit-title">{b.titulo}</p>
              <p className="home-benefit-desc">{b.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* 3 ── CATEGORÍAS */}
      <section className="home-section home-categories">
        <div className="home-section-header">
          <p className="home-label">Explora</p>
          <h2 className="home-title">Nuestras Categorías</h2>
          <p className="home-subtitle">Encuentra el estilo que expresa quién eres</p>
        </div>
        <div className="home-categories-grid">
          {CATEGORIAS.map((cat) => (
            <div key={cat.id} className="home-category-card">
              <span className="home-category-icon">{cat.icono}</span>
              <h3 className="home-category-name">{cat.nombre}</h3>
              <p className="home-category-desc">{cat.descripcion}</p>
              <span className="home-category-link">Ver todo <i className="pi pi-arrow-right" /></span>
            </div>
          ))}
        </div>
      </section>

      {/* 4 ── PRODUCTOS DESTACADOS */}
      <section className="home-section home-featured">
        <div className="home-section-header">
          <p className="home-label">Lo más amado</p>
          <h2 className="home-title">Productos Destacados</h2>
          <p className="home-subtitle">Los favoritos de nuestra comunidad esta temporada</p>
        </div>
        <div className="home-products-grid">
          {PRODUCTOS_DESTACADOS.map((p) => (
            <ProductCard key={p.id} producto={p} />
          ))}
        </div>
        <div className="home-section-cta">
          <Button label="Ver colección completa" icon="pi pi-arrow-right" iconPos="right" className="home-cta-btn" />
        </div>
      </section>

      {/* 5 ── BANNER PROMOCIONAL */}
      <section className="home-promo">
        <div className="home-promo-content">
          <p className="home-label home-label--light">Temporada 2025</p>
          <h2 className="home-promo-title">Nueva Colección<br /><em>Primavera · Verano</em></h2>
          <p className="home-promo-desc">Diseños exclusivos que combinan elegancia, comodidad y tendencia en cada par.</p>
          <Button label="Descubrir ahora" icon="pi pi-arrow-right" iconPos="right" className="home-promo-btn" />
        </div>
      </section>

      {/* 6 ── TESTIMONIOS */}
      <section className="home-section home-testimonials">
        <div className="home-section-header">
          <p className="home-label">Lo que dicen</p>
          <h2 className="home-title">Clientes que nos aman</h2>
          <p className="home-subtitle">Miles de mujeres ya encontraron su par perfecto</p>
        </div>
        <div className="home-testimonials-grid">
          {TESTIMONIOS.map((t) => (
            <div key={t.id} className="home-testimonial-card">
              <Stars count={t.stars} />
              <p className="home-testimonial-text">"{t.texto}"</p>
              <div className="home-testimonial-author">
                <div className="home-testimonial-avatar">{t.nombre.charAt(0)}</div>
                <div>
                  <p className="home-testimonial-name">{t.nombre}</p>
                  <p className="home-testimonial-city">{t.ciudad}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7 ── NEWSLETTER */}
      <section className="home-newsletter">
        <div className="home-newsletter-content">
          <p className="home-label home-label--light">Únete</p>
          <h2 className="home-newsletter-title">Sé la primera en enterarte</h2>
          <p className="home-newsletter-desc">Recibe en tu correo las nuevas colecciones, ofertas exclusivas y tips de moda.</p>
          <div className="home-newsletter-form">
            <input type="email" placeholder="tu@correo.com" className="home-newsletter-input" />
            <Button label="Suscribirme" className="home-newsletter-btn" />
          </div>
        </div>
      </section>
    </>
  );
}