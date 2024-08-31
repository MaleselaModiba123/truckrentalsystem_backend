import React, {useEffect, useState} from 'react';
import {getContactUsId} from '../services/ContactUsService';

const ContactUs = () => {
    const [contactUs, setContactUs] = useState({
        email: '',
        phone: '',
        address: '',
        businessHours: '',
    });

    useEffect(() => {
        const fetchContactUsByIdData = async () => {
            try {
                const data = await getContactUsId();  // Fetching data using the service function
                setContactUs(data[0]);  // Assuming you're fetching an array and need the first element
            } catch (error) {
                console.error('Error fetching contact info:', error);
            }
        };

        fetchContactUsByIdData();  // Call the function to fetch data on component mount
    }, []);

    const labelStyle = {
        fontWeight: 'bold',
        color: '#007bff'
    };
    return (
        <div className="contact-us">
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(-20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    h1, h2,h3,h4 {
                        animation: fadeIn 1s ease-out;
                        color: #007bff; /* Blue color */
                        font-size: 2.5rem; /* Font size */
                        font-weight: bold; /* Font weight */
                    }
                `}
            </style>
            <div className="contact-us-content">
                <div className="contact-header">
                    <img src="/ContactUs.jpeg" alt="Contact Us" className="contact-image"/>
                    <div className="contact-details">
                        <p><span style={labelStyle}>Email: </span>{contactUs.email}</p>
                        <p><span style={labelStyle}>Phone:</span> {contactUs.phone}</p>
                        <p><span style={labelStyle}>Address:</span> {contactUs.address}</p>
                        <p><span style={labelStyle}>Business Hours: </span>{contactUs.businessHours}</p>
                    </div>
                </div>
                <div className="contact-message">
                    <h2>Send us a message</h2>
                    <p>Our promise to our customers is that we will take pride in offering great service in all elements
                        of our business. We want to hear from you should you have an enquiry, concern, or complaint.</p>
                    <form>
                        <div className="radio-buttons">
                            <label>
                                <input type="radio" name="contactType" value="booking"/>
                                <span>Booking</span>
                            </label>
                            <label>
                                <input type="radio" name="contactType" value="customerCare"/>
                                <span>Customer Care</span>
                            </label>
                            <label>
                                <input type="radio" name="contactType" value="feedback"/>
                                <span>Complains</span>
                            </label>
                        </div>
                        <div className="input-group">
                            <input type="text" placeholder="Your Name"/>
                            <input type="email" placeholder="Your Email"/>
                        </div>
                        <textarea placeholder="Your Message"></textarea>
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
