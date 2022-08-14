import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="wrapper">
        <Link to="/"className="mainTitle-link">
          <h1 className="mainTitle">Social Kitchen</h1>
        </Link>
      </div>
    </header>
  )
}

export default Header
