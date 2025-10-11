import { useState } from 'react'
import './CardLocations.css'
import { Link } from "react-router-dom";


const CardLocations = ({ location, size }) => {
    const [favorite, setFavorite] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const toggleFavorite = () => {
        setFavorite(!favorite);
    };

    const shareCard = () => {
        alert(`¡Mira esta tarjeta de ${location.name}! 🍩`);
    };

    let url = "https://cdn.thesimpsonsapi.com/";
    url += size;
    url += location.image_path;


    return (
        <>
            <div className="card card-location">
                <div className="card-image">
                    <div className='cloud-container'>
                        <div className="cloud-decoration cloud-1"></div>
                        <div className="cloud-decoration cloud-2"></div>
                    </div>
                    <img src={url} alt={location.name} className="simpson-image" />
                </div>

                <div className="card-content">
                    <h3 className="simpsons-font title-simpson">{location.name}</h3>
                    <p className="subtitle-simpson">{location.town}</p>
                    <p className="description">{location.use}</p>

                    <div className="card-actions">
                        <div className="left-actions">
                            <button
                                className={`action-btn btn-heart ${favorite ? "active" : ""}`}
                                onClick={toggleFavorite}
                            >
                                {favorite ? "💖" : "❤️"}
                            </button>
                            <button className="action-btn btn-share" onClick={shareCard}>
                                📤
                            </button>
                        </div>
                        <Link to={`/locations/${location.id}`} className="action-btn btn-details">
                            →
                        </Link>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div
                        className="modal-card"
                    // onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-header">
                            <div className="modal-icon">🍩</div>
                            <h3 className="simpsons-font title-simpson">{location.name}</h3>
                            <p className="subtitle-simpson">¡Más detalles próximamente!</p>
                        </div>
                        <button
                            className="modal-close"
                            onClick={() => setShowModal(false)}
                        >
                            ¡D’oh! Cerrar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default CardLocations
