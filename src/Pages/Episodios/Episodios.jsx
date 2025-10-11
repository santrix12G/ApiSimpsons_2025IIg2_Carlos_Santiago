import { useEffect, useState } from "react";
import CardEpisodie from "../../Components/CardEpisodies/CardEpisodies"
import './Episodios.css'
import Pagination from "@mui/material/Pagination";
import CircularProgress from '@mui/material/CircularProgress';
import { useParams, useNavigate } from 'react-router-dom';
import DescriptionEpisodie from "../../Components/Description/DescriptionEpisodie/DescriptionEpisodie";

function Episodes() {

  const [episodies, setEpisodie] = useState([]);
  const [page, setPage] = useState(1);
  const [nombre_buscar, setNombreBuscar] = useState("");
  const [estadoButton, setEstadoButton] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const selectedEpisodie = id
    ? episodies.find((item) => String(item.id) === String(id))
    : null;

  useEffect(() => {
    setError(null);
    fetch(`https://thesimpsonsapi.com/api/episodes?page=${page}`)
      .then(response => response.json())
      .then(data => setEpisodie(data.results))
      .catch(error => setError(error.message || "Error al cargar episodios"));
  }, [page]);

  const handleRetry = () => {
    setError(null);
    fetch(`https://thesimpsonsapi.com/api/episodes?page=${page}`)
      .then(response => response.json())
      .then(data => setEpisodie(data.results))
      .catch(error => setError(error.message || "Error al cargar episodios"));
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const manejarCambio = (e) => {
    setNombreBuscar(e.target.value); // obtiene el texto del input
  };

  if (error) {
    return (
      <section style={{textAlign: "center", padding: "40px"}}>
        <h2>¡Ups! Ocurrió un error 😢</h2>
        <p>{error}</p>
        <button onClick={handleRetry} style={{margin: "12px", padding: "8px 16px", borderRadius: "8px", background: "#007bff", color: "#fff", border: "none"}}>Reintentar</button>
        <button onClick={() => navigate(-1)} style={{margin: "12px", padding: "8px 16px", borderRadius: "8px", background: "#333", color: "#fff", border: "none"}}>Volver</button>
      </section>
    );
  }

  return (
    <section>

      <div className="search-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Search character, episode or locations..."
            value={nombre_buscar}
            onChange={manejarCambio}
            onClick={() => {
              setEstadoButton(false);
            }}
          />

        </div>
        <div className="button-search">
          <button className="button-s button-search"
            onClick={() => {
              setEstadoButton(true);
            }}
          >
            Search
          </button>
          <button className="button-s button-clear" onClick={() => {
            setNombreBuscar("");
          }}>
            Clear
          </button>
        </div>
      </div>

      <h2 className="simpsons-font title-section">📺 Episodios</h2>
      <p className="description-section">
        Explora los episodios memorables de Los Simpson, desde "Bart el Genio"
        hasta "La Casa-Árbol del Terror". Cada tarjeta presenta una imagen
        vibrante y detalles clave como temporada y número de episodio. ¡Haz clic
        para más información y comparte tu favorito!
      </p>
      <Pagination
        count={39}
        page={page}
        onChange={handleChange}
        className="pagination"
      />
      <div className="grid">
        {episodies.filter(item =>
          !estadoButton || item.name.toLowerCase().includes(nombre_buscar.toLowerCase())
        ).map((item) => (
          <CardEpisodie key={item.id} episodie={item} size={"200"} />
        ))}
      </div>
      {(selectedEpisodie && (
        <DescriptionEpisodie episodie={selectedEpisodie} />
      ))}
    </section>
  );
}

export default Episodes;
