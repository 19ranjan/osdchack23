import React from 'react'
import classes from './footer.module.css'

const Footer = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.col}>
       <h2>About the App</h2> 
        <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</p>
      </div>
      <div className={classes.col}>
        <h2>Contacts</h2>
        <span>Phone +123 456 789</span>
        <span>Gmail:PinkScreen@gmail.com</span>
        </div>
      <div className={classes.col}>
        <h2>Location</h2>
        <span>Agra</span>
        <span>Noida</span>
        <span>Kota</span>
      </div>
    </div>
  )
}

export default Footer