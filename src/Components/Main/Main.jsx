import "./Main.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Characters from "../../Pages/Personajes/Personajes";
import Locations from "../../Pages/Lugares/lugares";
import Episodes from "../../Pages/Episodios/Episodios";
import CharacterModal from "../../Components/Description/DescripcionCharacter";
import { Element } from "react-scroll";

function Main({ children }) {
  return <main className="main">
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/characters/" element={<Characters />} />
      <Route path="/characters/:id" element={<Characters />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/locations/:id" element={<Locations />} />
      <Route path="/episodes" element={<Episodes />} />
      <Route path="/episodes/:id" element={<Episodes />} />

    </Routes>
  </main>;
}

function Welcome() {
  return (
    <div className="welcome">
      <Element name="main_welcome">
        <div className="emoji">🍺</div>
        <h2 className="simpsons-font title">¡Bienvenido a Springfield!</h2>
        <p className="subtitle">
          Selecciona una sección del menú para explorar el mundo de Los Simpson
        </p>
        <div className="icons">
          <span>🍩</span>
          <span>🏠</span>
          <span>👨‍👩‍👧‍👦</span>
          <span>🍺</span>
        </div>
      </Element>
    </div>
  );
}

export default Main;
