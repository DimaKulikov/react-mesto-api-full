import React from 'react'
import Popup from './Popup'
import tick from '../images/tick.svg'
import cross from '../images/cross.svg'

const icons={
  tick,cross
}


const InfoTooltip = ({icon,message,...props}) => {
  return (
    (icon &&
      <Popup {...props}>
        <div className='form'>
          <div className='info-tooltip'>
          <div className='info-tooltip__icon' style={{backgroundImage: `url(${icons[icon]})`, width: 120, height: 120}}> </div>
            <p className='info-tooltip__text'>{message}</p>
          </div>
        </div>
      </Popup>
    )
      
    )
}

export default InfoTooltip
