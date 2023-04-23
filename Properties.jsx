import React from 'react'
import { FaBed, FaSquareFull } from 'react-icons/fa'
import person from '../../assets/person.png'
import img from '../../assets/5.png'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { useState } from 'react'
import { arrPriceRanges } from '../../util/idxToPriceRange'
import classes from './Properties.module.css'
import { useEffect } from 'react'
import { continentToIdx, idxToContinent } from '../../util/idxToContinent'
//import { arrPriceRanges } from '../../util/idxToPriceRange'
import { request } from '../../util/fetchAPI'

const Properties = () => {
  const [allProperties, setAllProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [state, setState] = useState(null)
  const query = (useLocation().search).slice(1) // slice(1) to remove "?"
  const arrQuery = query.split("&")
  const navigate = useNavigate()

  // fetch all properties
  useEffect(() => {
    const fetchAllProperties = async() => {
      const data = await request(`/property/getAll`, 'GET')
      setAllProperties(data)
    }
    fetchAllProperties()
  }, [])

  // parsing query params
  useEffect(() => {
    if (arrQuery && allProperties?.length > 0 && state === null) {
      let formattedQuery = {}
      arrQuery.forEach((option, idx) => {
        const key = option.split("=")[0]
        const value = option.split("=")[1]

        formattedQuery = { ...formattedQuery, [key]: value }

        // if we are on the last index, assign the formattedQuery obj to state
        if (idx === arrQuery.length - 1) {
          setState(prev => formattedQuery)
          handleSearch(formattedQuery)
        }
      })
    }
  }, [allProperties, arrQuery])


  const handleState = (e) => {
    setState(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }


  const handleSearch = (param = state) => {
    let options
    // we either pass the formattedObj or event, that's why we do the IF/ELSE
    if (param?.nativeEvent) {
      options = state
    } else {
      options = param
    }
    const filteredProperties = allProperties.filter((property) => {

      const priceRange = arrPriceRanges[options.priceRange]
      const minPrice = Number(priceRange.split('-'))[0]
      const maxPrice = Number(priceRange.split('-'))[1]
      const continent = continentToIdx(property.continent)

      if (
        property.type === options.type
        && continent === Number(options.continent)
        && property.price >= minPrice && property.price <= maxPrice
      ) {
        return property
      }
    })

    const queryStr = `type=${options.type}&continent=${options.continent}&priceRange=${options.priceRange}`

    navigate(`/properties?${queryStr}`, { replace: true })
    setFilteredProperties(prev => filteredProperties)
  }



  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.options}>
          <select value={state?.type} name="type" onChange={handleState}>
            <option disabled>Select type</option>
            <option value="agra">Agra</option>
            <option value="kota">Kota</option>
            <option value="Noida">Noida</option>
          </select>
          <select value={state?.priceRange} name="priceRange" onChange={handleState}>
            <option disabled>Select Price Range</option>
            <option value="0">0-10,000</option>
            <option value="1">10,000-20,000</option>
            <option value="2">20,000-30,000</option>
            <option value="3">30,000-40,000</option>
            <option value="4">40,000-50,000</option>
          </select>
          <select value={state?.continent} name="continent" onChange={handleState}>
            <option disabled>Select Continent</option>
            <option value="0">Europe</option>
            <option value="1">Asia</option>
            <option value="2">Africa</option>
            <option value="3">South America</option>
            <option value="4">North America</option>
            <option value="5">Oceania</option>
          </select>
          <button className={classes.searchBtn}>
            <AiOutlineSearch className={classes.searchIcon} onClick={handleSearch} />
          </button>
        </div>
        {filteredProperties?.length > 0 ?(
          <>
            <div className={classes.titles}>
              <h5>Selected properties</h5>
              <h2>Property you may like</h2>
            </div>
            <div className={classes.properties}>
              {filteredProperties.map((property) => (
                <div key={property._id} className={classes.property}>
                  <Link  className={classes.imgContainer} to={`/PropertyDetail/${property._id}`}>
                  <img src={`http://localhost:5000/images/${property?.img}`} alt="" />
                  </Link>
                  <div className={classes.details}>
                    <div className={classes.priceAndOwner}>
                      <span className={classes.price}>Rs. {property.price}</span>
                      <img src={person} className={classes.owner} />
                      <>console.log({`/propertyDetail/${property._id}`})</>
                    </div>
                    <div className={classes.moreDetails}>
                      <span>{property.beds} <FaBed className={classes.icon} /></span>
                      <span>{property.sqmeters} square meters<FaSquareFull className={classes.icon} /></span>
                    </div>
                    <div className={classes.desc}>
                      {property.decs}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </> ): <h2 className={classes.noProperty}>We have no properties with the specified options.</h2>}
      </div>
    </div>
  )
}

export default Properties