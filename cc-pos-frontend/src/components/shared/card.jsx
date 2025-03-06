import React from 'react'

const Card = (props) => {
    return(
        <div className="card sales-today">
            <div style={{fontSize:"2vw"}} className='card-icon'>{props.icon}</div>
            <div> <h2 style={{fontSize:"1.5vw"}}>{props.title}</h2>
            <h1 style={{fontSize:"2vw"}}>{props.value}</h1></div>
        </div>
    )
}

export default Card