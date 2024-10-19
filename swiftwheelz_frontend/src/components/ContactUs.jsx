import React, {useEffect, useState} from 'react';
import {getContactUsId} from '../services/ContactUsService';
import {createComplaint} from '../services/ComplaintService.js';

const ContactUs = () => {
    const [contactUs, setContactUs] = useState({
        email: '',
        phone: '',
        address: '',
        businessHours: '',
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        contactType: '',
    });

    useEffect(() => {
        const fetchContactUsByIdData = async () => {
            try {
                const data = await getContactUsId();
                setContactUs(data[0]);
            } catch (error) {
                console.error('Error fetching contact info:', error);
            }
        };

        fetchContactUsByIdData();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.contactType === 'complains') {
            try {
                const description = formData.message;

                const response = await createComplaint(description);

                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }

                alert('Your complaint has been sent successfully!');
                setFormData({ name: '', email: '', message: '', contactType: '' }); // Reset form
            } catch (error) {
                console.error('Error sending complaint:', error);
                alert('There was an error sending your complaint. Please try again.');
            }
        } else {
            alert('Please select "Complains" to send a complaint.');
        }
    };

    const labelStyle = {
        fontWeight: 'bold',
        color: '#007bff',
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
                        color: #007bff;
                        font-size: 2.5rem;
                        font-weight: bold;
                    }
                `}
            </style>
            <div className="contact-us-content">
                <div className="contact-header">
                    <img src="/ContactUs.jpeg" alt="Contact Us" className="contact-image" />
                    <div className="contact-details">
                        <p><span style={labelStyle}>Email: </span>{contactUs.email}</p>
                        <p><span style={labelStyle}>Phone: </span>{contactUs.phone}</p>
                        <p><span style={labelStyle}>Address: </span>{contactUs.address}</p>
                        <p><span style={labelStyle}>Business Hours: </span>{contactUs.businessHours}</p>
                    </div>
                </div>
                <div className="contact-message">
                    <h2>Send us a message</h2>
                    <p>Our promise to our customers is that we will take pride in offering great service in all elements
                        of our business. We want to hear from you should you have an enquiry, concern, or complaint.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="radio-buttons">
                            <label>
                                <input
                                    type="radio"
                                    name="contactType"
                                    value="booking"
                                    checked={formData.contactType === 'booking'}
                                    onChange={handleInputChange}
                                />
                                <span>Booking</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="contactType"
                                    value="customerCare"
                                    checked={formData.contactType === 'customerCare'}
                                    onChange={handleInputChange}
                                />
                                <span>Customer Care</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="contactType"
                                    value="complains"
                                    checked={formData.contactType === 'complains'}
                                    onChange={handleInputChange}
                                />
                                <span>Complains</span>
                            </label>
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;