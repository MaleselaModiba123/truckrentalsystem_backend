import React, { useState, useEffect } from 'react';
import { getContactUsById } from '../services/ContactUsService';

const ContactUs = () => {
    const [contactUs, setContactUs] = useState({
        email: '',
        phone: '',
        address: '',
        businessHours: '',
    });

    useEffect(() => {
        const fetchContactUsData = async () => {
            try {
                const response = await getContactUsById();  // Fetching data using the service function
                setContactUs(response);  // Update the state with the fetched data
            } catch (error) {
                console.error('Error fetching contact info:', error);
            }
        };

        fetchContactUsData();  // Call the function to fetch data on component mount
    }, []);

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
                        <p>Email: {contactUs.email}</p>
                        <p>Phone: {contactUs.phone}</p>
                        <p>Address: {contactUs.address}</p>
                        <p>Business Hours: {contactUs.businessHours}</p>
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
