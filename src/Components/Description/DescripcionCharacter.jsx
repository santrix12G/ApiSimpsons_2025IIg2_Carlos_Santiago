
import "./Description.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const SimpsonsModal = ({ character, onClose }) => {

  const [id, setId] = useState(character.id);
  const [characterEspecif, setCharacters] = useState([]);
  const [phrase, setPhrase] = useState('');
  const navigate = useNavigate();
  if (!character) return null;

  useEffect(() => {
      fetch(`https://thesimpsonsapi.com/api/characters/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setCharacters(data);
          setPhrase(data.phrases[0]);
        })
        .catch((error) => console.error(error));
    }, [id]);

    
  let url= "https://cdn.thesimpsonsapi.com/500";
  url+= characterEspecif.portrait_path;


  return (
    <div className="modal-overlay" onClick={() => navigate("/characters")}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer click dentro
      >
        <div className="modal-header">
          <img src={url} className="modal-image"/>
          <h3 className="simpsons-font title-simpson">{characterEspecif.name}</h3>
          <p className="subtitle-simpson">{characterEspecif.description}</p>
          <p className="status"><strong>Status:</strong>{(characterEspecif.status?characterEspecif.status:"Unknow")}</p>
          <p className="ocupation"><strong>Occupation: </strong>{(characterEspecif.occupation?characterEspecif.occupation:"Unknow")}</p>
          <p className="phrase"><strong>Phrase: </strong>{(phrase?phrase:"Unknow")}</p>
        </div>
        <button className="modal-close" onClick={() => navigate("/characters")}>
          ¡D’oh! Cerrar
        </button>
      </div>
    </div>
  );
};

export default SimpsonsModal;
