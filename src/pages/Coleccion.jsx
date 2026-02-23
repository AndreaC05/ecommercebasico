import { useState, useEffect, useRef } from "react";
import "../style/Coleccion.css";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import { Slider } from "primereact/slider";

/* ─── Datos de productos ─── */
const PRODUCTOS = [
  { id:1,  nombre:"Stiletto Milano",      categoria:"Tacones",   precio:189, precioAntes:230, color:"Perla",    tallas:[35,36,37,38,39], nuevo:true,  oferta:false, destacado:true  },
  { id:2,  nombre:"Sandalia Capri",       categoria:"Sandalias", precio:145, precioAntes:null,color:"Dorado",   tallas:[35,36,37,38],    nuevo:false, oferta:false, destacado:false },
  { id:3,  nombre:"Flat Parisina",        categoria:"Flats",     precio:120, precioAntes:160, color:"Negro",    tallas:[36,37,38,39,40], nuevo:false, oferta:true,  destacado:false },
  { id:4,  nombre:"Bota Chelsea Rose",    categoria:"Botas",     precio:215, precioAntes:null,color:"Rosa",     tallas:[36,37,38,39],    nuevo:true,  oferta:false, destacado:true  },
  { id:5,  nombre:"Tacón Florentino",     categoria:"Tacones",   precio:175, precioAntes:210, color:"Nude",     tallas:[35,36,37,38,39], nuevo:false, oferta:true,  destacado:false },
  { id:6,  nombre:"Mule Venecia",         categoria:"Flats",     precio:135, precioAntes:null,color:"Blanco",   tallas:[36,37,38],       nuevo:true,  oferta:false, destacado:false },
  { id:7,  nombre:"Sandalia Atenas",      categoria:"Sandalias", precio:98,  precioAntes:130, color:"Plateado", tallas:[35,36,37,38,39], nuevo:false, oferta:true,  destacado:false },
  { id:8,  nombre:"Bota Over-knee",       categoria:"Botas",     precio:280, precioAntes:null,color:"Camel",    tallas:[36,37,38],       nuevo:true,  oferta:false, destacado:true  },
  { id:9,  nombre:"Pump Clásico",         categoria:"Tacones",   precio:158, precioAntes:190, color:"Rojo",     tallas:[35,36,37,38,39,40],nuevo:false,oferta:true, destacado:false },
  { id:10, nombre:"Flat Tokio",           categoria:"Flats",     precio:110, precioAntes:null,color:"Beige",    tallas:[36,37,38,39],    nuevo:true,  oferta:false, destacado:false },
  { id:11, nombre:"Sandalia Ibiza",       categoria:"Sandalias", precio:125, precioAntes:155, color:"Turquesa", tallas:[35,36,37,38],    nuevo:false, oferta:true,  destacado:false },
  { id:12, nombre:"Botín Otoño",          categoria:"Botas",     precio:195, precioAntes:null,color:"Cognac",   tallas:[36,37,38,39],    nuevo:true,  oferta:false, destacado:false },
];

const CATEGORIAS = ["Todos","Tacones","Flats","Sandalias","Botas"];
const COLORES    = ["Todos","Perla","Dorado","Negro","Rosa","Nude","Blanco","Plateado","Camel","Rojo","Beige","Turquesa","Cognac"];
const ORDENAR    = ["Destacados","Precio: menor a mayor","Precio: mayor a menor","Más nuevos","Ofertas"];

/* ─── Colores visuales de swatches ─── */
const COLOR_MAP = {
  Perla:"#F0EDE8", Dorado:"#C9A84C", Negro:"#1a1a1a", Rosa:"#E8B4B8",
  Nude:"#E8D5C4",  Blanco:"#ffffff",  Plateado:"#C0C0C0", Camel:"#C19A6B",
  Rojo:"#C0392B",  Beige:"#F5F0E8", Turquesa:"#4ECDC4", Cognac:"#9B4F2A",
};

/* ─── Tarjeta de producto ─── */
function ProductCard({ producto, index }) {
  const [favs, setFavs] = useState(false);
  const [tallaActiva, setTallaActiva] = useState(null);
  const [agregado, setAgregado] = useState(false);

  const agregarCarrito = () => {
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1800);
  };

  return (
    <article
      className="col-card"
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      {/* Imagen */}
      <div className="col-card__img">
        {/* Reemplaza con: <img src={producto.imagen} alt={producto.nombre} /> */}
        <div className="col-card__img-placeholder" />

        {/* Badges */}
        <div className="col-card__badges">
          {producto.nuevo  && <span className="col-badge col-badge--new">Nuevo</span>}
          {producto.oferta && <span className="col-badge col-badge--sale">Oferta</span>}
        </div>

        {/* Favorito */}
        <button
          className={`col-card__fav ${favs ? "col-card__fav--active" : ""}`}
          onClick={() => setFavs(v => !v)}
          aria-label="Favorito"
        >
          <i className={`pi ${favs ? "pi-heart-fill" : "pi-heart"}`} />
        </button>

        {/* Overlay con acciones */}
        <div className="col-card__overlay">
          <div className="col-card__tallas">
            <p className="col-card__tallas-label">Selecciona tu talla</p>
            <div className="col-card__tallas-grid">
              {producto.tallas.map(t => (
                <button
                  key={t}
                  className={`col-card__talla ${tallaActiva === t ? "col-card__talla--active" : ""}`}
                  onClick={() => setTallaActiva(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <button
            className={`col-card__add ${agregado ? "col-card__add--done" : ""}`}
            onClick={agregarCarrito}
          >
            <i className={`pi ${agregado ? "pi-check" : "pi-shopping-bag"}`} />
            <span>{agregado ? "¡Agregado!" : "Agregar al carrito"}</span>
          </button>
          <button className="col-card__quick">
            <i className="pi pi-eye" /> Vista rápida
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="col-card__info">
        <p className="col-card__cat">{producto.categoria}</p>
        <h3 className="col-card__name">{producto.nombre}</h3>
        <div className="col-card__bottom">
          <div className="col-card__prices">
            <span className="col-price-current">S/ {producto.precio}</span>
            {producto.precioAntes && (
              <span className="col-price-before">S/ {producto.precioAntes}</span>
            )}
          </div>
          <div className="col-card__swatch" style={{ background: COLOR_MAP[producto.color] || "#eee" }} title={producto.color} />
        </div>
      </div>
    </article>
  );
}

/* ─── PÁGINA COLECCIÓN ─── */
export default function Coleccion() {
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [colorActivo,     setColorActivo]     = useState("Todos");
  const [ordenActivo,     setOrdenActivo]     = useState("Destacados");
  const [precioMax,       setPrecioMax]       = useState(300);
  const [soloOfertas,     setSoloOfertas]     = useState(false);
  const [soloNuevos,      setSoloNuevos]      = useState(false);
  const [vistaGrid,       setVistaGrid]       = useState(true);   // grid vs lista
  const [sidebarOpen,     setSidebarOpen]     = useState(false);
  const [busqueda,        setBusqueda]        = useState("");

  /* Filtrado */
  let productos = PRODUCTOS.filter(p => {
    if (categoriaActiva !== "Todos" && p.categoria !== categoriaActiva) return false;
    if (colorActivo     !== "Todos" && p.color     !== colorActivo)     return false;
    if (p.precio > precioMax)                                            return false;
    if (soloOfertas && !p.oferta)                                        return false;
    if (soloNuevos  && !p.nuevo)                                         return false;
    if (busqueda && !p.nombre.toLowerCase().includes(busqueda.toLowerCase())) return false;
    return true;
  });

  /* Ordenado */
  productos = [...productos].sort((a, b) => {
    if (ordenActivo === "Precio: menor a mayor") return a.precio - b.precio;
    if (ordenActivo === "Precio: mayor a menor") return b.precio - a.precio;
    if (ordenActivo === "Más nuevos")   return b.nuevo - a.nuevo;
    if (ordenActivo === "Ofertas")      return b.oferta - a.oferta;
    return b.destacado - a.destacado;
  });

  const limpiarFiltros = () => {
    setCategoriaActiva("Todos");
    setColorActivo("Todos");
    setPrecioMax(300);
    setSoloOfertas(false);
    setSoloNuevos(false);
    setBusqueda("");
  };

  const hayFiltros = categoriaActiva !== "Todos" || colorActivo !== "Todos" ||
    precioMax < 300 || soloOfertas || soloNuevos || busqueda;

  return (
    <div className="col-page">

      {/* ── HERO de sección ── */}
      <header className="col-hero">
        <div className="col-hero__bg" />
        <div className="col-hero__content">
          <p className="col-hero__label">Temporada 2025</p>
          <h1 className="col-hero__title">Colección Completa</h1>
          <p className="col-hero__desc">Cada par cuenta una historia. Encuentra la tuya.</p>
        </div>
        {/* Decoración línea diagonal */}
        <div className="col-hero__deco" />
      </header>

      {/* ── BARRA SUPERIOR: búsqueda + ordenar + vistas ── */}
      <div className="col-topbar">
        <div className="col-topbar__left">
          {/* Botón filtros mobile */}
          <button className="col-filter-toggle" onClick={() => setSidebarOpen(v => !v)}>
            <i className="pi pi-sliders-h" />
            <span>Filtros</span>
            {hayFiltros && <span className="col-filter-dot" />}
          </button>

          {/* Búsqueda */}
          <div className="col-search">
            <i className="pi pi-search col-search__icon" />
            <input
              type="text"
              placeholder="Buscar en la colección..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              className="col-search__input"
            />
            {busqueda && (
              <button className="col-search__clear" onClick={() => setBusqueda("")}>
                <i className="pi pi-times" />
              </button>
            )}
          </div>
        </div>

        <div className="col-topbar__right">
          <span className="col-results">{productos.length} resultado{productos.length !== 1 ? "s" : ""}</span>

          {/* Ordenar */}
          <div className="col-select-wrap">
            <select
              value={ordenActivo}
              onChange={e => setOrdenActivo(e.target.value)}
              className="col-select"
            >
              {ORDENAR.map(o => <option key={o}>{o}</option>)}
            </select>
            <i className="pi pi-chevron-down col-select__arrow" />
          </div>

          {/* Vista grid / lista */}
          <div className="col-view-toggle">
            <button
              className={`col-view-btn ${vistaGrid ? "col-view-btn--active" : ""}`}
              onClick={() => setVistaGrid(true)}
              aria-label="Vista cuadrícula"
            >
              <i className="pi pi-th-large" />
            </button>
            <button
              className={`col-view-btn ${!vistaGrid ? "col-view-btn--active" : ""}`}
              onClick={() => setVistaGrid(false)}
              aria-label="Vista lista"
            >
              <i className="pi pi-bars" />
            </button>
          </div>
        </div>
      </div>

      {/* ── TAGS de filtros activos ── */}
      {hayFiltros && (
        <div className="col-active-filters">
          {categoriaActiva !== "Todos" && (
            <span className="col-filter-tag">
              {categoriaActiva}
              <button onClick={() => setCategoriaActiva("Todos")}><i className="pi pi-times" /></button>
            </span>
          )}
          {colorActivo !== "Todos" && (
            <span className="col-filter-tag">
              {colorActivo}
              <button onClick={() => setColorActivo("Todos")}><i className="pi pi-times" /></button>
            </span>
          )}
          {precioMax < 300 && (
            <span className="col-filter-tag">
              Hasta S/ {precioMax}
              <button onClick={() => setPrecioMax(300)}><i className="pi pi-times" /></button>
            </span>
          )}
          {soloOfertas && (
            <span className="col-filter-tag">
              En oferta
              <button onClick={() => setSoloOfertas(false)}><i className="pi pi-times" /></button>
            </span>
          )}
          {soloNuevos && (
            <span className="col-filter-tag">
              Nuevos
              <button onClick={() => setSoloNuevos(false)}><i className="pi pi-times" /></button>
            </span>
          )}
          {busqueda && (
            <span className="col-filter-tag">
              "{busqueda}"
              <button onClick={() => setBusqueda("")}><i className="pi pi-times" /></button>
            </span>
          )}
          <button className="col-filter-clear" onClick={limpiarFiltros}>
            Limpiar todo
          </button>
        </div>
      )}

      {/* ── LAYOUT PRINCIPAL ── */}
      <div className="col-layout">

        {/* SIDEBAR DE FILTROS */}
        <aside className={`col-sidebar ${sidebarOpen ? "col-sidebar--open" : ""}`}>

          <div className="col-sidebar__header">
            <h2 className="col-sidebar__title">Filtros</h2>
            {hayFiltros && (
              <button className="col-sidebar__clear" onClick={limpiarFiltros}>
                Limpiar
              </button>
            )}
            <button className="col-sidebar__close" onClick={() => setSidebarOpen(false)}>
              <i className="pi pi-times" />
            </button>
          </div>

          {/* Categoría */}
          <div className="col-filter-group">
            <h3 className="col-filter-group__title">Categoría</h3>
            <div className="col-filter-pills">
              {CATEGORIAS.map(cat => (
                <button
                  key={cat}
                  className={`col-pill ${categoriaActiva === cat ? "col-pill--active" : ""}`}
                  onClick={() => setCategoriaActiva(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Precio */}
          <div className="col-filter-group">
            <h3 className="col-filter-group__title">
              Precio máximo
              <span className="col-filter-group__value">S/ {precioMax}</span>
            </h3>
            <Slider
              value={precioMax}
              onChange={e => setPrecioMax(e.value)}
              min={50} max={300} step={5}
              className="col-slider"
            />
            <div className="col-slider-range">
              <span>S/ 50</span>
              <span>S/ 300</span>
            </div>
          </div>

          {/* Color */}
          <div className="col-filter-group">
            <h3 className="col-filter-group__title">Color</h3>
            <div className="col-color-swatches">
              {COLORES.map(col => (
                <button
                  key={col}
                  className={`col-swatch ${colorActivo === col ? "col-swatch--active" : ""}`}
                  onClick={() => setColorActivo(col)}
                  title={col}
                  style={{
                    background: col === "Todos"
                      ? "linear-gradient(135deg,#E8B4B8,#F3E1DC,#D8D8D8)"
                      : COLOR_MAP[col],
                    border: col === "Blanco" ? "1px solid #D8D8D8" : undefined
                  }}
                />
              ))}
            </div>
            {colorActivo !== "Todos" && (
              <p className="col-color-label">{colorActivo}</p>
            )}
          </div>

          {/* Switches */}
          <div className="col-filter-group">
            <h3 className="col-filter-group__title">Filtros especiales</h3>

            <label className="col-toggle">
              <span>Solo ofertas</span>
              <div
                className={`col-toggle__track ${soloOfertas ? "col-toggle__track--on" : ""}`}
                onClick={() => setSoloOfertas(v => !v)}
              >
                <div className="col-toggle__thumb" />
              </div>
            </label>

            <label className="col-toggle">
              <span>Solo nuevos</span>
              <div
                className={`col-toggle__track ${soloNuevos ? "col-toggle__track--on" : ""}`}
                onClick={() => setSoloNuevos(v => !v)}
              >
                <div className="col-toggle__thumb" />
              </div>
            </label>
          </div>
        </aside>

        {/* Overlay mobile */}
        {sidebarOpen && (
          <div className="col-sidebar-overlay" onClick={() => setSidebarOpen(false)} />
        )}

        {/* GRID DE PRODUCTOS */}
        <main className="col-main">
          {productos.length === 0 ? (
            <div className="col-empty">
              <div className="col-empty__icon">👠</div>
              <h3 className="col-empty__title">Sin resultados</h3>
              <p className="col-empty__desc">Intenta con otros filtros o términos de búsqueda.</p>
              <button className="col-empty__btn" onClick={limpiarFiltros}>
                Ver toda la colección
              </button>
            </div>
          ) : (
            <div className={`col-grid ${!vistaGrid ? "col-grid--list" : ""}`}>
              {productos.map((p, i) => (
                <ProductCard key={p.id} producto={p} index={i} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}