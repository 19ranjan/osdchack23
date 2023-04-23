import React from 'react'
import {useState} from 'react'
import {AiOutlineSearch} from 'react-icons/ai' 
import classes from './hero.module.css'
import { useNavigate } from 'react-router-dom'

const Hero =()=>{
  const [type, setType]=useState("agra")
  const [continent, setContinent]=useState("0")
  const [PriceRange, setPriceRange]=useState("0")
  const navigate= useNavigate()

  const handleSearch=()=>{

    //NAVIGATE PROPERIES
    navigate(`/properties?types=${type}&continent=${continent}&priceRange=${PriceRange}`)

  }


  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Let me find your dream place right now</h2>
        <h5>Search the best selection of luxury real estate</h5>
        <div className={classes.options}>
          <select onChange={(e)=> setType(e.target.value)}>
            <option disabled>Select type</option>
            <option value="Agra">Agra</option>
            <option value="Kota">Kota</option>
            <option value="Noida">Noida</option>
          </select>
          <select onChange={(e)=> setPriceRange(e.target.value)}>
                        <option disabled>Select Price Range</option>
            <option value="0">0-10,000</option>
            <option value="1">10,000-20,000</option>
            <option value="2">20,000-30,000</option>
            <option value="3">30,000-40,000</option>
            <option value="4">40,000-50,000</option>
          </select>
          <select onChange={(e)=> setContinent(e.target.value)}>
            <option disabled>Continent</option>
            <option value="0">JIIT</option>
            <option value="1">UNACADEMY</option>
            <option value="2">ALLEN</option>
            <option value="3">PHYSICSWAALH</option>
            <option value="4">JSS</option>
            <option value="5">Oceania</option>
          </select>
          <AiOutlineSearch onClick={handleSearch} className={classes.searchIcon}/>
        </div>
      </div>
    </div>
  )
}

export default Hero