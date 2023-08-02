import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser';
import email from '../images/email.png';
import Notification from './Notification';


function Email() {

    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');

    const form = useRef()  
    const sendEmail = (e) => {
        e.preventDefault();

    emailjs.sendForm('service_8zy5qjw', 'template_8ce841m', form.current, '9wk1GM5wYHoixFrDf')
        .then((result) => {
            setTitle('Success');
            setMessage("Email Sent Successfully");
        }, (error) => {
            setTitle("Alert");
            setMessage(error.text);
        });
    };

    const clearMsg = () => {
        setTitle('')
        setMessage('');
    }

    return (
        <>
            {message && title ? <Notification  msg={message} clearMsg={clearMsg} title={title} /> : null }
            <div className="email">
                <div className='email-info'>
                    <h1>Never miss a drop</h1>
                    <p>Subcribe to our super-exclusive drop list and be the first to know abour upcoming drops</p>
                    <form className="text" onSubmit={sendEmail} ref={form}>
                        <input type="text" placeholder="Enter Your Email"  name ="user_email" autoComplete="off" />
                        <button type ="submit">►</button>
                    </form>
                </div>
                <div className='image-container'>
                    <img src={email} alt='loading...' />
                </div>
            </div>
        </>
    )
}

export default Email
