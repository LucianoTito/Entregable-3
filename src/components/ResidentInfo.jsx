import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios'
import './styles/residentInfo.css'

const ResidentInfo = ({url}) => {

  const [character, setCharacter] = useState()

  useEffect(() => {
    axios.get(url)
      .then(res => setCharacter(res.data))
      .catch(err => console.log(err))
  }, [])
    
  return (
    <article className='resident'>
      <header className='resident__header'>
        <img className='resident__img' src={character?.image} alt="" />
        <div className='resident__container-status'>
          <span className={`resident__circle ${character?.status}`}></span>
          <span className='resident__status'>{character?.status}</span>
        </div>
      </header>
      <section className='resident__body'>
        <h3 className='resident__name'>{character?.name}</h3>
        <hr className=''/>
        <ul className='resident__list'>
          <li className='resident__item'><span className='resident__label'>SPECIE</span>{character?.species}</li>
          <li className='resident__item'><span className='resident__label'>ORIGIN</span>{character?.origin.name}</li>
          <li className='resident__item'><span className='resident__label'>EPPISODES WHERE APPEAR</span>{character?.episode.length}</li>
        </ul>
      </section>
    </article>
  )
}

export default ResidentInfo