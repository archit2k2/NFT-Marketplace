import React from 'react'
import intro from '../images/intro.mp4'

function Video() {
    return (
      <div className='intro'>
          <div className="intro-overlay"></div>
          <video src={intro} autoPlay loop muted />
    </div>
    )
}

export default Video