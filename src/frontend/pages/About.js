import React, { useEffect } from 'react'
import '../styles/About.css'
import Brand from '../components/Brand'
import AboutHero from '../components/AboutHero'
import { useLocation } from 'react-router-dom';
import Email from '../components/Email';

function About() {

  document.title="OpenLake | About"
  
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className='about'> 
        <AboutHero />
        <Brand />
        <Email />
    </div>
  )
}

export default About