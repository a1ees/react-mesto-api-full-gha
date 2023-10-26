import React from 'react';
import headerLogo from '../images/logo/header-logo.svg';

function Header(props) {
  return (
    <header className="header">
      <img
        src={headerLogo}
        alt="Место"
        className="header__logo"
      />
      <div className='header__info'>
        <p className='header__email'>{props.profileEmail}</p>
        <button 
          style={props.buttonStyle}
          onClick={props.sign}
          className='header__button'>{props.name}
        </button>
      </div>
    </header>
  )
}

export default Header;