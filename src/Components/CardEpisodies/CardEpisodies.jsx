import { useState } from 'react'
import './CardEpisodies.css'
import { Link, Route, Routes } from "react-router-dom";
import Alert from '@mui/material/Alert';

const CardEpisodies = ({ episodie, size }) => {
    const [favorite, setFavorite] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const toggleFavorite = () => {
        setFavorite(!favorite);
    };

    const shareCard = () => {
        alert(`¡Mira esta tarjeta de ${episodie.name}! 🍩`);
    };

    let url = "https://cdn.thesimpsonsapi.com/";
    url += size;
    url += episodie.image_path;

    return (
        <>
            <div className="card card-episodie">
                <div className="card-image">
                    <div className='cloud-container'>
                        <div className="cloud-decoration cloud-1"></div>
                        <div className="cloud-decoration cloud-2"></div>
                    </div>
                    <img src={url} alt={episodie.name} className="simpson-image" />
                </div>

                <div className="card-content">
                    <h3 className="simpsons-font title-simpson">{episodie.name}</h3>
                    <p className="subtitle-simpson">{"AirDate: " + (episodie.airdate ? episodie.airdate : "Unknow")}</p>
                    <p className="description">{"Season " + episodie.season + ", Episodies's Number: " + episodie.episode_number}</p>

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
                        <Link to={`/episodes/${episodie.id}`} className="action-btn btn-details">
                            →
                        </Link>
                    </div>
                    
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div
                        className="modal-card"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-header">
                            <div className="modal-icon">🍩</div>
                            <h3 className="simpsons-font title-simpson">{episodie.name}</h3>
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
}

export default CardEpisodies
