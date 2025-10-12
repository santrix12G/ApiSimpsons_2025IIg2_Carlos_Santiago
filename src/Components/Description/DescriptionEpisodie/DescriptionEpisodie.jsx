import "../Description.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const EpisodieModal = ({ episodie, onClose }) => {


    const temporadas = {};
    for (let i = 1; i <= 32; i++) {
        temporadas[2000 + i] = `https://lossimpson-tvlatino.blogspot.com/search/label/Temporada%20${String(i).padStart(2, '0')}`;
    }

    



    const [id, setId] = useState(episodie.id);
    const [episodieEspecif, setepisodies] = useState([]);
    const navigate = useNavigate();
    if (!episodie) return null;

    useEffect(() => {
        fetch(`https://thesimpsonsapi.com/api/episodes/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setepisodies(data);
            })
            .catch((error) => console.error(error));
    }, [id]);


    let url = "https://cdn.thesimpsonsapi.com/500";
    url += episodieEspecif.image_path;


    return (
        <div className="modal-overlay" onClick={() => navigate("/episodes")}>
            <div
                className="modal-card"
                onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer click dentro
            >
                <div className="modal-header">
                    <img src={url} className="modal-image" />
                    <h3 className="simpsons-font title-simpson">{episodieEspecif.name}</h3>
                    <p className="subtitle-simpson">{episodieEspecif.description}</p>
                    <p className="air-date"><strong>AirDate: </strong>{(episodieEspecif.airdate ? episodieEspecif.airdate : "Unknow")}</p>
                    <p className="ocupation"><strong>Season: </strong>{(episodieEspecif.season ? episodieEspecif.season : "Unknow")}</p>
                    <p className="synopsis"><strong>Synopsis: </strong>{(episodieEspecif.synopsis ? episodieEspecif.synopsis : "Unknow")}</p>
                </div>
                <button className="modal-close" onClick={() => navigate("/episodes")}>
                    ¡D’oh! Cerrar
                </button>

                <button className='btn-see-more' onClick={() => {
                    window.open(temporadas[2000 + parseInt(episodieEspecif.season)], '_blank');
                }}>
                    Ver episodio
                </button>

            </div>
        </div>
    );
};

export default EpisodieModal;
