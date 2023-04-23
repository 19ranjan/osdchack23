import React from 'react'
import classes from './PopularProperties.module.css'
import {Link} from 'react-router-dom'
import img1 from '../../assets/4.png'
import img2 from '../../assets/pg2.png'
import img3 from '../../assets/3.png'
import { useState } from 'react'
import { useEffect } from 'react'
import { request } from '../../util/fetchAPI'



const PopularProperties = () => {
 const [numProperties, setNumProperties]=useState({})
 useEffect(()=>{
  const fetchNumberProperties=async()=>{
    try{
      const data=await request('/property/find/types', 'GET')
      console.log(data);
      setNumProperties(data);
    }catch(error){
      console.error("hi")
    }
  } 

  fetchNumberProperties()
 },[])


  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Different types of properties</h5>
          <h2>Best type of properties for you</h2>
        </div>
          <div className={classes.properties}>
            <Link className={classes.property} to={'/properties?type=agra&continent=1&priceRange=2'}>
              <img src={img1} />
              <div className={classes.quantity}>{numProperties?.agra} properties</div>
              <h5>Agra properties</h5>
            </Link>
            <Link className={classes.property} to={'/properties?type=kota&continent=1&priceRange=2'}>
              <img src={img2} />
              <div className={classes.quantity}>{numProperties?.kota} properties</div>
              <h5>Kota properties</h5>
            </Link>
            <Link className={classes.property} to={'/properties?type=noida&continent=1&priceRange=2'}>
              <img src={img3} />
              <div className={classes.quantity}>{numProperties?.noida} properties</div>
              <h5>Noida properties</h5>
            </Link>
          </div>
      </div>

      
    </div>
  )
}

export default PopularProperties
