import { BrowserRouter, Route, Routes } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Coleccion from "./pages/Coleccion";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Rutas públicas */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/coleccion" element={<Coleccion />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
