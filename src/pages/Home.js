import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './Image/HomePage.jpeg';

const Home = () => {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 1000); // Delay for the popup

        return () => clearTimeout(timer);
    }, []);

    const containerStyles = {
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        color: '#fff',
        textAlign: 'center',
    };

    const popupStyles = {
        position: 'absolute',
        top: showPopup ? '10%' : '-100px', // Adjusted top position for pop-down effect
        left: '50%',
        transform: 'translate(-50%, 0)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Added shadow
        display: 'block',
        transition: 'top 0.5s ease-in-out', // Smooth transition for top position
        zIndex: 9999,
        color: '#333',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Translucent background
    };

    const linkStyles = {
        color: '#fff',
        textDecoration: 'underline',
        cursor: 'pointer',
        transition: 'color 0.3s ease', // Smooth transition for color change
        '&:hover': {
            color: '#ffd700', // Change color on hover
        },
    };

    const cardStyles = {
        margin: '20px',
        padding: '40px', // Increased padding for larger size
        backgroundColor: '#ffd700', // Yellow background
        borderRadius: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        color: '#333',
    };

    return (
        <div style={containerStyles}>
            <div style={popupStyles}>
                <Typography variant="h3" style={{ marginBottom: '10px', color: '#333' }}>
                    Welcome to eLearning Platform
                </Typography>
                <Typography variant="body1" style={{ color: '#333' }}>
                </Typography>
            </div>
            <div style={{ flex: 1 }}></div>
            <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <Typography variant="body2">
                    <Link component="button" onClick={() => navigate('/privacyPolicy')} style={linkStyles}>
                        Privacy Policy
                    </Link>
                    <Link component="button" onClick={() => navigate('/RefundCancellationPolicy')} style={linkStyles}>
                        Refund & Cancellation Policy
                    </Link>
                    <Link component="button" onClick={() => navigate('/TermsAndConditions')} style={linkStyles}>
                        Terms and Conditions
                    </Link>
                </Typography>
            </div>
            <div style={{ margin: '20px' }}>
                <Typography variant="h4" style={{ marginBottom: '20px', color: '#fff' }}>
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {/* Replace with actual featured course cards */}
                    <div style={cardStyles}>
                        <Typography variant="h5" style={{ marginBottom: '10px' }}>
                            JAVA
                        </Typography>
                        <Typography variant="body2">
                            Cross-platform object-oriented language
                        </Typography>
                    </div>
                    <div style={cardStyles}>
                        <Typography variant="h5" style={{ marginBottom: '10px' }}>
                            PYTHON
                        </Typography>
                        <Typography variant="body2">
                            Versatile and readable scripting language..
                        </Typography>
                    </div>
                    <div style={cardStyles}>
                        <Typography variant="h5" style={{ marginBottom: '10px' }}>
                            JAVASCRIPT
                        </Typography>
                        <Typography variant="body2">
                            Browser-based scripting language.
                        </Typography>
                    </div>
                    <div style={cardStyles}>
                        <Typography variant="h5" style={{ marginBottom: '10px' }}>
                            REACTjs
                        </Typography>
                        <Typography variant="body2">
                            Front-end UI library for web apps.
                        </Typography>
                    </div>
                    <div style={cardStyles}>
                        <Typography variant="h5" style={{ marginBottom: '10px' }}>
                            SPRINGBOOT
                        </Typography>
                        <Typography variant="body2">
                            Rapid Java application development
                        </Typography>
                    </div>
                    <div style={cardStyles}>
                        <Typography variant="h5" style={{ marginBottom: '10px' }}>
                            NODEjs
                        </Typography>
                        <Typography variant="body2">
                            Server-side JavaScript runtime.
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
