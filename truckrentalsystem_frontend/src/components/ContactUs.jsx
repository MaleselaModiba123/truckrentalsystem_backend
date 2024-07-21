import React from 'react';

const ContactUs = () => {
    return (
        <div className="contact-us">
            <div className="contact-us-content">
                <div className="contact-header">
                    <img src="/ContactUs.jpeg" alt="Contact Us" className="contact-image" /> {/* Replace with the actual image filename */}
                    <div className="contact-details">
                        <p>Email: info@truckrental.com</p>
                        <p>Phone: +27 217 897 656</p>
                        <p>Address: 05 Truck Rental Street, Johannesburg, South Africa</p>
                        <p>Business Hours: Mon - Fri: 07:00 - 18:00</p>
                    </div>
                </div>
                <div className="contact-message">
                    <h2>Send us a message</h2>
                    <p>Our promise to our customers is that we will take pride in offering great service in all elements of our business. We want to hear from you should you have an enquiry, concern, or complaint.</p>
                    <form>
                        <div className="radio-buttons">
                            <label>
                                <input type="radio" name="contactType" value="booking" />
                                <span>Booking</span>
                            </label>
                            <label>
                                <input type="radio" name="contactType" value="customerCare" />
                                <span>Customer Care</span>
                            </label>
                            <label>
                                <input type="radio" name="contactType" value="feedback" />
                                <span>Feedback</span>
                            </label>
                        </div>
                        <div className="input-group">
                            <input type="text" placeholder="Your Name" />
                            <input type="email" placeholder="Your Email" />
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
