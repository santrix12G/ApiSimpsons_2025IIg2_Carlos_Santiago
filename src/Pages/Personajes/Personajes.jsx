import React, { useState, useEffect } from "react";
import "./Personajes.css";
import CardSimpsons from "../../Components/CardSimpsons/CardSimpsons";
import Pagination from "@mui/material/Pagination";
import { useParams, useNavigate } from 'react-router-dom';
import DescripcionCharacter from "../../Components/Description/DescripcionCharacter";
import { useMemo } from "react";

const Personajes = () => {
  const [characters, setCharacters] = useState([]);
  const [allCharacters, setAllCharacters] = useState([]);
  const [charactersOriginal, setCharactersOriginal] = useState([]);
  const [page, setPage] = useState(1);
  const [nombre_buscar, setNombreBuscar] = useState("");
  const [estadoButton, setEstadoButton] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const selectedCharacter = id
    ? allCharacters.find((item) => String(item.id) === String(id))
    : null;

  useEffect(() => {
    setError(null);
    fetch(`https://thesimpsonsapi.com/api/characters?page=${page}`)
      .then((response) => response.json())
      .then((data) => {setCharacters(data.results); setCharactersOriginal(data.results);})
      .catch((error) => setError(error.message || "Error al cargar personajes"));
  }, [page]);

  const handleRetry = () => {
    setError(null);
    fetch(`https://thesimpsonsapi.com/api/characters?page=${page}`)
      .then((response) => response.json())
      .then((data) => {setCharacters(data.results); setCharactersOriginal(data.results);})
      .catch((error) => setError(error.message || "Error al cargar personajes"));
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
        <button onClick={handleRetry} style={{ margin: "12px", padding: "8px 16px", borderRadius: "8px", background: "#007bff", color: "#fff", border: "none" }}>Reintentar</button>
        <button onClick={() => navigate(-1)} style={{ margin: "12px", padding: "8px 16px", borderRadius: "8px", background: "#333", color: "#fff", border: "none" }}>Volver</button>
      </section>
    );
  }


  // traar todo los personajes
  useEffect(() => {
    const fetchAllPages = async () => {
      setError(null);
      try {
        const allCharacters = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
          const response = await fetch(`https://thesimpsonsapi.com/api/characters?page=${page}`);
          if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

          const data = await response.json();
          if (data.results?.length > 0) {
            allCharacters.push(...data.results);
            page++;
          } else {
            hasMore = false;
          }
        }

        setAllCharacters(allCharacters);
      } catch (err) {
        setError(err.message || "Error al cargar los personajes");
      }
    };

    fetchAllPages();
  }, []);

  const personajesFiltrados = useMemo(() => {
    const q = nombre_buscar.trim().toLowerCase();
    if (!q) return allCharacters;
    return allCharacters.filter(c => c.name?.toLowerCase().includes(q));
  }, [allCharacters, nombre_buscar]);



  
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
              nombre_buscar.trim() != "" ? setCharactersOriginal(personajesFiltrados) : setCharactersOriginal(characters);
            }}
          >
            Search
          </button>
          <button className="button-s button-clear" onClick={() => {
            setNombreBuscar("");
            setCharactersOriginal(characters);
          }}>
            Clear
          </button>
        </div>
      </div>

      <h2 className="simpsons-font title-section">👨‍👩‍👧‍👦 Personajes</h2>
      <p className="description-section">
        Explora los personajes icónicos de Los Simpson, desde Homero y Marge
        hasta Bart, Lisa y Maggie. Cada tarjeta presenta una imagen vibrante y
        detalles clave como ocupación y género. ¡Haz clic para más información y
        comparte tu favorito!
      </p>

      <Pagination
        count={60}
        page={page}
        onChange={handleChange}
        className="pagination"
      />

      <div className="grid">
        {
          charactersOriginal.map(item => (
              <CardSimpsons
                key={item.id}
                character={item}
                size={"200"}
                type={"Character"}
              />
            ))
        }

      </div>

      {selectedCharacter && (
        <DescripcionCharacter character={selectedCharacter} />
      )}
    </section>
  );
};

export default Personajes;
