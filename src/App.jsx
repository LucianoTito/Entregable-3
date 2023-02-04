import './App.css'
import axios from "axios";
import { useState, useEffect } from "react";
import getRandomLocation from "./utils/getRandomLocation";
import LocationInfo from './components/LocationInfo';
import ResidentInfo from './components/ResidentInfo';

function App() {

  const [location, setLocation] = useState()
  const [numberLocation, setNumberLocation] = useState(getRandomLocation())
  const [hasError, setHasError] = useState(false)
  const [listLocation, setListLocation] = useState()
  const [isShow, setIsShow] = useState(false)
  
  // const [inputValue, setInputValue] = useState()

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${numberLocation}`
    axios.get(url)
      .then(res => {
        setLocation(res.data)
        setHasError(false)
      })
      .catch(err => {
        console.log(err)
        setHasError(true)
      })

  }, [numberLocation])

  const handleSubmit = e => {
    e.preventDefault()
    if (e.target.inputLocation.value.trim().length === 0) {
      setNumberLocation(getRandomLocation())
    } else {
      setNumberLocation(e.target.inputLocation.value.trim())
    }
    e.target.inputLocation.value = e.target.inputLocation.value.trim() /*Borra los espacios en el buscador de seacrh */
  }

  const handleChange = e => {  
   const url=`https://rickandmortyapi.com/api/location/?name=${e.target.value.trim()}` /*Para mostrar sugerencias en la barra search */
   axios.get(url)
   .then(res=> setListLocation(res.data.results))
   .catch(err=> console.log(err))
  }
  // const handleFocus = () => setIsShow(true)
  // const handleBlur = () => setIsShow(false)
  // const handleClickList = id => setNumberLocation(loc.id)

 
  return (
    <div className="App">
       <div className="app__header">
    <h1 className="app__title">Rick and Morty</h1>
  </div>
      <form className='form' onSubmit={handleSubmit} action="">
        <input 
        className='form__input' 
        id='inputLocation' 
        type="text" 
        onChange={handleChange} /*Para mostrar sugerencias en la barra search */
        onFocus={() => setIsShow(true)}
        onBlur={() => setIsShow(false)}// onFocus={handleFocus}
        // onBlur={handleBlur}
        />
        <button className='form__btn'>Search</button>
        <div className='sugerence__container'>
          {
            isShow &&
            <ul className='sugerence__info-container'>
              {
              listLocation?.map(loc => (
                <li className='sugerence__info-li' onClick={() => setNumberLocation(loc.id)} key={loc.id}>{loc.name}</li> /*Para mostrar sugerencias en la barra search */
              ))
            }
            </ul>
          }
        </div>
      </form>
      {
        hasError ?
        <div className='app__error'>
        <img src='https://images8.alphacoders.com/107/1075646.jpg' alt='Invalid response' />
        <div className='app__mesagge-error-container'>
        <p>Hey! you must provide and id from 1 to 126 </p>
        </div>
      </div>
          :
          <>

            <LocationInfo
              location={location} />
            <div className='residents__container'>
              {
                location?.residents.map(url => (
                  <ResidentInfo
                    key={url}
                    url={url}
                  />
                ))
              }
            </div>
          </>
      }
    </div>

  )
}

export default App
