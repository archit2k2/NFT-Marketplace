import React from 'react'

function Notification({title, msg, clearMsg}) {

  return (
    <div className='notification'>
        <div className='notification-window'>
            <h1>
                {title}&nbsp;
                {
                    title === "Alert" ?
                    <i className="fa-solid fa-triangle-exclamation" style={{color : "#ff0000"}} ></i>
                    :
                    <i className="fa-solid fa-circle-check" style={{color : "#00ff11"}} ></i>
                }
            </h1>
            <p>
                {msg}
            </p>
            <button className='btn notification-btn' onClick={clearMsg}>
                OK
            </button>
        </div>
    </div>
  )
}

export default Notification