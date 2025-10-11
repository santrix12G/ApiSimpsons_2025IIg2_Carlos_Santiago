import { useState, useEffect } from 'react'
import './lugares.css'
import Pagination from "@mui/material/Pagination";
import CardLocations from '../../Components/CardLocations/CardLocations'
import { useParams, useNavigate } from 'react-router-dom';
import DescripcionLocation from '../../Components/Description/DescriptionLocation/DescriptionLocation';

const lugares = () => {

  const [locations, setLocation] = useState([]);
  const [page, setPage] = useState(1);
  const [nombre_buscar, setNombreBuscar] = useState("");
  const [estadoButton, setEstadoButton] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const selectedLocation = id
    ? locations.find((item) => String(item.id) === String(id))
    : null;

  useEffect(() => {
    setError(null);
    fetch(`https://thesimpsonsapi.com/api/locations?page=${page}`)
      .then(response => response.json())
      .then(data => setLocation(data.results))
      .catch(error => setError(error.message || "Error al cargar lugares"));
  }, [page]);

  const handleRetry = () => {
    setError(null);
    fetch(`https://thesimpsonsapi.com/api/locations?page=${page}`)
      .then(response => response.json())
      .then(data => setLocation(data.results))
      .catch(error => setError(error.message || "Error al cargar lugares"));
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const manejarCambio = (e) => {
    setNombreBuscar(e.target.value); // obtiene el texto del input
  };

  if (error) {
    return (
      <section style={{ textAlign: "center", padding: "40px" }}>
        <h2>¡Ups! Ocurrió un error 😢</h2>
        <p>{error}</p>
        <button onClick={handleRetry} style={{
          margin: "12px",
          padding: "8px 16px",
          borderRadius: "8px",
          background: "#007bff",
          color: "#fff",
          border: "none"
        }}>
          Reintentar
        </button>
        <button onClick={() => navigate(-1)} style={{
          margin: "12px",
          padding: "8px 16px",
          borderRadius: "8px",
          background: "#333",
          color: "#fff",
          border: "none"
        }}>
          Volver
        </button>
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
      <h2 className="simpsons-font title-section">🏠 Lugares</h2>
      <p className="description-section">
        Descubre los lugares emblemáticos de Springfield, desde la taberna de Moe
        hasta la planta nuclear. Cada tarjeta ofrece una imagen vibrante y
        detalles clave como tipo y dimensión. ¡Haz clic para más información y
        comparte tu lugar favorito!
      </p>

      <Pagination
        count={24}
        page={page}
        onChange={handleChange}
        className="pagination"
      />
      <div className="grid">
        {locations.filter(item =>
            !estadoButton || item.name.toLowerCase().includes(nombre_buscar.toLowerCase())
          ).map((item) => (
          <CardLocations key={item.id} location={item} size={"500"} />
        ))}
      </div>
      {selectedLocation && (
        <DescripcionLocation location={selectedLocation} />
      )}
    </section>
  );
}

export default lugares
