import React from 'react'
import RedSocial from "../Header/SocialMedias"
import { Element } from "react-scroll";
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer-simpsons">
      <Element name='footer'>
        <div className="cloud-footer cloud-1-footer"></div>
        <div className="cloud-footer cloud-2-footer"></div>
        <div className="footer-content">
          <p className="simpsons-font">© 2025 The Simpsons Fan App 🍩</p>
          <p>Hecho con 💛 por Santiago Cuéllar y Carlos Rivas Villegas</p>
          <p>
            Hecho con tecnologías como React, React Router, Fetch API y CSS3.
          </p>
          <p>¡Gracias por visitar nuestra aplicación y siguenos en nuestras redes sociales!</p>
          <RedSocial />
        </div>
      </Element>
    </footer>
  );
}

export default Footer
