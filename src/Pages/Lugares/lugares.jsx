import { useState, useEffect, use } from 'react'
import './lugares.css'
import Pagination from "@mui/material/Pagination";
import CardLocations from '../../Components/CardLocations/CardLocations'
import { useParams, useNavigate } from 'react-router-dom';
import DescripcionLocation from '../../Components/Description/DescriptionLocation/DescriptionLocation';
import { useMemo } from "react";

const lugares = () => {

  const [locations, setLocation] = useState([]);
  const [allLocations, setLocations] = useState([]);
  const [originalLocations, setOriginalLocations] = useState([]);
  const [page, setPage] = useState(1);
  const [nombre_buscar, setNombreBuscar] = useState("");
  const [estadoButton, setEstadoButton] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  let selectedLocation = 0;

  if (id) {
    selectedLocation = allLocations.find((item) => String(item.id) === String(id));
  }

  useEffect(() => {
    setError(null);
    fetch(`https://thesimpsonsapi.com/api/locations?page=${page}`)
      .then(response => response.json())
      .then(data => { setLocation(data.results); setOriginalLocations(data.results); })
      .catch(error => setError(error.message || "Error al cargar lugares"));
  }, [page])

  const handleRetry = () => {
    setError(null);
    fetch(`https://thesimpsonsapi.com/api/locations?page=${page}`)
      .then(response => response.json())
      .then(data => { setLocation(data.results); setOriginalLocations(data.results); })
      .catch(error => setError(error.message || "Error al cargar lugares"));
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const manejarCambio = (e) => {
    setNombreBuscar(e.target.value); // obtiene el texto del input
  };

  useEffect(() => {
    setError(null);
    const fetchAllLocations = async () => {
      let allResults = [];
      let currentPage = 1;
      let totalPages = 1;
      try {
        do {
          const response = await fetch(`https://thesimpsonsapi.com/api/locations?page=${currentPage}`);
          const data = await response.json();
          if (data.results) {
            allResults = allResults.concat(data.results);
          }
          totalPages = data.pages;
          currentPage++;
        } while (currentPage <= totalPages);
        setLocations(allResults);
      } catch (error) {
        setError(error.message || "Error al cargar lugares");
      }
    };
    fetchAllLocations();

  }, []);

  const lugaresFiltrados = useMemo(() => {
    const q = nombre_buscar.trim().toLowerCase();
    if (!q) return allLocations;
    return allLocations.filter(c => c.name?.toLowerCase().includes(q));
  }, [allLocations, nombre_buscar]);

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
              nombre_buscar.trim() != "" ? setOriginalLocations(allLocations) : null;
            }}
          >
            Search
          </button>
          <button className="button-s button-clear" onClick={() => {
            setNombreBuscar("");
            setOriginalLocations(locations);
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
        {originalLocations.map((item) => (
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
