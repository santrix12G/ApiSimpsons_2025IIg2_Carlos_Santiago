import React from 'react'
import { useState } from 'react'
import './CardSimpsons.css'
import { Link, Route, Routes } from "react-router-dom";
import Description from "../Description/DescripcionCharacter"

const CardSimpsons = ({ character, size }) => {
    const [favorite, setFavorite] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const toggleFavorite = () => {
        setFavorite(!favorite);
    };

    const shareCard = () => {
        alert(`¡Mira esta tarjeta de ${character.name}! 🍩`);
    };

    let url = "https://cdn.thesimpsonsapi.com/";
    url += size;
    url += character.portrait_path;

    return (
        <>
            <div className="card card-simpson">
                <div className="card-image">
                    <div className='cloud-container'>
                        <div className="cloud-decoration cloud-1"></div>
                        <div className="cloud-decoration cloud-2"></div>
                    </div>
                    <img src={url} alt={character.name} className="simpson-image" />
                </div>

                <div className="card-content">
                    <h3 className="simpsons-font title-simpson">{character.name}</h3>
                    <p className="subtitle-simpson">{character.occupation}</p>
                    <p className="description">{character.gender}</p>

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
                        <Link to={`/characters/${character.id}`} className="action-btn btn-details">
                            →
                        </Link>
                    </div>
                </div>
            </div>


        </>
    );
};
export default CardSimpsons
