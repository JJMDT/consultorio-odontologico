// Header.js
import React from 'react';
import '../styles/HeaderComponent.css';
const Header = ({ title }) => {
  return (
    <div className="portada">
      <div className="container">
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default Header;