import React from "react";

function InfoTooltip(props) {
  return (
    <div className={`infotooltip ${props.isOpen && "infotooltip_visible"}`}>
      <div className="infotooltip__items">
        <button
          type="button"
          className='popup__close-button popup__close-button_infotooltip'
          onClick={props.onClose}
        />
        <img className="infotooltip__icon" src={props.toolTipLogo} />
        <p className="infotooltip__text">{props.toolTipText}</p>
      </div>
    </div>
  )
}

export default InfoTooltip;