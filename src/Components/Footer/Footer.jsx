import React from 'react'
import RedSocial from "../Header/SocialMedias"
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer-simpsons">
      <div className="cloud-footer cloud-1-footer"></div>
      <div className="cloud-footer cloud-2-footer"></div>
      <div className="footer-content">
        <p className="simpsons-font">© 2025 The Simpsons Fan App 🍩</p>
        <p>Hecho con 💛 por Santiago Cuéllar</p>
        <p>
          Hecho con tecnologías como React, React Router, Fetch API y CSS3.
        </p>
        <p>¡Gracias por visitar nuestra aplicación y siguenos en nuestras redes sociales!</p>
        <RedSocial />
      </div>
    </footer>
  );
}

export default Footer
