import "./Header.css";
import React from 'react'
import SocialMedias from "./SocialMedias";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo-text simpsons-font">The Simpsons API</h1>
        <p className="tagline">
          La mejor API de Los Simpson, únete a la aventura y sé parte de ella.
        </p>
        <SocialMedias />
      </div>

    </header>
  );
}

export default Header

