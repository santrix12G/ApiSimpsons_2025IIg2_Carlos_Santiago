import React from 'react'
import "./NavHeader.css"

const NavHeader = () => {
    return (
        <nav className='nav-header'>
            <div className='logo-nav'>
                <img className='logo-img-nav' src='https://thesimpsonsapi.com/logo.webp' />
            </div>
            <ul className='nav-header-list'>
                <li className='nav-header-item'>
                    Episodios
                </li>
                <li className='nav-header-item'>
                    Personajes
                </li>
                <li className='nav-header-item'>
                    <a href="https://github.com/santrix12G?tab=repositories" aria-label="GitHub" className="github-icon" target="_blank" rel="noreferrer">
                        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" aria-hidden="true">
                            <path
                                d="M12 0a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61a3.18 3.18 0 0 0-1.34-1.76c-1.1-.75.09-.74.09-.74a2.52 2.52 0 0 1 1.83 1.23 2.55 2.55 0 0 0 3.48 1 2.54 2.54 0 0 1 .76-1.6c-2.67-.3-5.47-1.34-5.47-5.95a4.66 4.66 0 0 1 1.24-3.22 4.33 4.33 0 0 1 .12-3.18s1.01-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23a4.33 4.33 0 0 1 .12 3.18 4.66 4.66 0 0 1 1.24 3.22c0 4.63-2.8 5.64-5.48 5.94a2.84 2.84 0 0 1 .81 2.2v3.26c0 .32.22.69.83.58A12 12 0 0 0 12 0z"
                            />
                        </svg>
                    </a>
                </li>

            </ul>
        </nav>
    )
}

export default NavHeader
