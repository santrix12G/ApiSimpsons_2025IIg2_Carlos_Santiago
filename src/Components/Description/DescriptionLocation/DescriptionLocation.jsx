import "../Description.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const locationModal = ({ location, onClose }) => {

    const [id, setId] = useState(location.id);
    const [locationEspecif, setlocations] = useState([]);
    const navigate = useNavigate();
    if (!location) return null;

    useEffect(() => {
        fetch(`https://thesimpsonsapi.com/api/locations/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setlocations(data);
            })
            .catch((error) => console.error(error));
    }, [id]);


    let url = "https://cdn.thesimpsonsapi.com/500";
    url += locationEspecif.image_path;


    return (
        <div className="modal-overlay" onClick={() => navigate("/locations")}>
            <div
                className="modal-card"
                onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer click dentro
            >
                <div className="modal-header">
                    <img src={url} className="modal-image" />
                    <h3 className="simpsons-font title-simpson">{locationEspecif.name}</h3>
                    <p className="subtitle-simpson">{locationEspecif.description}</p>
                    <p className="air-date"><strong>Town: </strong>{(locationEspecif.town ? locationEspecif.town : "Unknow")}</p>
                    <p className="ocupation"><strong>Use: </strong>{(locationEspecif.use ? locationEspecif.use : "Unknow")}</p>
                </div>
                <button className="modal-close" onClick={() => navigate("/locations")}>
                    ¡D’oh! Cerrar
                </button>
            </div>
        </div>
    );
};

export default locationModal;
