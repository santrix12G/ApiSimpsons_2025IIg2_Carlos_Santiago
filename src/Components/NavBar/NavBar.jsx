import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "./NavBar.css";

function Sidebar() {
  const [quote, setQuote] = useState("Mmm... donuts.");
  const [characters, setCharacters] = useState([]);
  const [url_image, setUrlImage] = useState("");
  const numberRandom = Math.floor(Math.random() * 60) + 1;

  useEffect(() => {
    fetch(`https://thesimpsonsapi.com/api/characters/${numberRandom}`)
      .then((response) => response.json())
      .then((data) => setCharacters(data))
      .catch((error) => console.error(error));
  });  
 

  const getNewQuote = () => {  
    const quotes = characters.phrases;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setUrlImage(characters.portrait_path);
    setQuote(quotes[randomIndex]);
  };

  const goToRandomEpisode = () => {
    const randomId = Math.floor(Math.random() * 20) + 1;
    window.location.href = `/episodes/${randomId}`;
  };

  const goToRandomCharacter = () => {
    const randomId = Math.floor(Math.random() * 20) + 1;
    window.location.href = `/characters/${randomId}`;
  }

  const goToRandomLocation = () => {
    const randomId = Math.floor(Math.random() * 20) + 1;
    window.location.href = `/locations/${randomId}`;
  }

  return (
    <aside className="sidebar">
      {/* Navegación principal */}
      <nav className="nav">
        <Link to="/characters" className="btn-simpson">👨‍👩‍👧‍👦 Personajes</Link>
        <Link to="/locations" className="btn-simpson">🏠 Lugares</Link>
        <Link to="/episodes" className="btn-simpson">📺 Episodios</Link>
      </nav>

      
      <div className="quote-card">
        <img src={(url_image?"https://cdn.thesimpsonsapi.com/200"+url_image:"https://cdn.thesimpsonsapi.com/500/character/1.webp")} alt="Character" className="character-image" />
        <p className="quote-text">"{quote}"</p>
        <button onClick={getNewQuote} className="btn-quote">📜 New Quote</button>
      </div>

      <div className="container-random">
        <div className="random-episode" onClick={goToRandomCharacter}>
          🎲 Random Character
        </div>
        <div className="random-episode" onClick={goToRandomLocation}>
          🎲 Random Location
        </div>
        <div className="random-episode" onClick={goToRandomEpisode}>
          🎲 Random Episode
        </div>
      </div>

      
      <div className="donut-area">
        <div className="donut">🍩</div>
        <p className="simpsons-font doh">¡D'oh!</p>
      </div>
    </aside>
  );
}

export default Sidebar;
