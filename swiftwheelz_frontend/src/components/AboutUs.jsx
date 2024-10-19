import React from 'react';

const labelStyle = {
    fontWeight: 'bold',
    fontSize:'18px',
    color: '#007bff'
};
const AboutUs = () => {
    return (

        <div className="about-us" style={{ backgroundColor: '#e3e1e1' }}>
            <h1>Who Are We?</h1>
            <p>
                We specialize in truck rental services and make it easy for you to book online and hire trucks from several locations.
            </p>
            <p>
                Our vehicle rental services include trucks in different sizes, depending on your needs. Each of our vehicles is in excellent condition, ensuring safety and comfort, establishing us as a leading provider of vehicle rentals across South Africa.
            </p>

            <h1>Why Choose Us?</h1>
            <p>
                <span style={labelStyle}>Comprehensive Vehicle Options:</span> At TruckRental, we offer a diverse fleet of trucks tailored to meet your specific needs. Whether you're moving cargo across town or transporting goods across the country, our range of vehicles ensures we have the right solution for you.
            </p>

            <p>
                <span style={labelStyle}>Commitment to Quality and Safety:</span> Each of our trucks undergoes rigorous maintenance checks to ensure optimal performance and safety on the road. We prioritize your peace of mind, knowing that you're driving a reliable vehicle.
            </p>

            <p>
                <span style={labelStyle}>Competitive Pricing:</span> We believe in providing value without compromising quality. Our transparent pricing and flexible rental options ensure that you get the best deal possible, tailored to your budget and requirements.
            </p>

            <p>
                <span style={labelStyle}>Exceptional Customer Service:</span> Our dedicated team is committed to delivering exceptional customer service. From helping you choose the right truck to offering support throughout your rental period, we're here to ensure your experience with us is seamless and satisfying.
            </p>
        </div>
    );
};

export default AboutUs;
