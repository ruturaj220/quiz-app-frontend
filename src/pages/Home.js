import React from "react";
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './Image/HomePage.jpeg';

const Home = () => {

    const navigate = useNavigate();

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
        padding: '20px' // Added padding for better spacing
    };

    const welcomeStyles = {
        marginBottom: '20px', // Increased margin bottom for spacing
        color: '#0d0d0d', // Changed font color to a teal-like color
        fontWeight: 'bold', // Bold font weight
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' // Added text shadow for better visibility
    };

    const linkStyles = {
        margin: '0 10px',
        textDecoration: 'none', // Remove default underline
        color: 'black', // Change link color as needed
        cursor: 'pointer', // Show pointer cursor on hover
        // color: '#fff',
        // textDecoration: 'underline',
        // cursor: 'pointer',
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


    const courses = [
        { title: 'JAVA', description: 'Cross-platform object-oriented language' },
        { title: 'PYTHON', description: 'Versatile and readable scripting language.' },
        { title: 'JAVASCRIPT', description: 'Browser-based scripting language.' },
        { title: 'REACTjs', description: 'Front-end UI library for web apps.' },
        { title: 'SPRINGBOOT', description: 'Rapid Java application development' },
        { title: 'NODEjs', description: 'Server-side JavaScript runtime.' },
    ];

    return (
        <div style={containerStyles}>
            <div>
                <Typography variant="h3" style={welcomeStyles}>
                    Welcome to eLearning Platform
                </Typography>
                <Typography variant="body1" style={{ color: '#fff', fontStyle: 'italic' }}>
                    Enhance your skills with our wide range of courses.
                </Typography>
            </div>
            <div style={{ flex: 1 }}></div>
            <div style={{ margin: '20px' }}>
                <Typography variant="h4" style={{ marginBottom: '20px', color: '#fff' }}>
                    Featured Courses
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {courses.map((course, index) => (
                        <div key={index} style={cardStyles}>
                            <Typography variant="h5" style={{ marginBottom: '10px' }}>
                                {course.title}
                            </Typography>
                            <Typography variant="body2">
                                {course.description}
                            </Typography>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                    <Link component="button" onClick={() => navigate('/privacyPolicy')} style={linkStyles}>
                        Privacy Policy
                    </Link>
                    <Link component="button" onClick={() => navigate('/RefundCancellationPolicy')} style={linkStyles}>
                        Refund & Cancellation Policy
                    </Link>
                    <Link component="button" onClick={() => navigate('/TermsAndConditions')} style={linkStyles}>
                        Terms and Conditions
                    </Link>
                    <Link component="button" onClick={() => navigate('/contactUs')} style={linkStyles}>
                        Contact us
                    </Link>
                    <Link component="button" onClick={() => navigate('/aboutUs')} style={linkStyles}>
                        About us
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default Home;