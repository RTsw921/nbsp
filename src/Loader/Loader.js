import React from 'react'
import "./loader.css"
const Loader= ()=>{
    return (
        <div className="spinner">
          <div className="ball"></div>
          <div className="ball1"></div>
          <div className="ball2"></div>
          <p>Загрузка...</p>
        </div>
    )
  }
export default Loader;