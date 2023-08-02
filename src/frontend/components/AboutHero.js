import React from 'react'
import hero from '../images/hero2.png'

function AboutHero() {
  return (
    <div className="about_box_hero">
        <div className="about_box_hero_left">
            <h1>👋 About Us.</h1>
            <p>
            We're impartial and independent, and every day we create
            distinctive, world-class programmes and content which inform,
            educate and entertain millions of people in the around the world.
            </p>
        </div>
        <div className="about_box_hero_right">
            <img src={hero} alt="loading"/>
        </div>
    </div>
  )
}

export default AboutHero