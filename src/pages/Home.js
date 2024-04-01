import React from "react";
<<<<<<< HEAD
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

=======
import customImage from './Image/cover.png';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/ruturaj220">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Home = () => {
    const styles = {
        background: 'radial-gradient(circle, rgba(102, 51, 153, 1) 0%, rgba(25, 0, 51, 1) 100%)',
        backgroundSize: '400% 400%',
        // animation: 'galaxyBackground 10s ease infinite', // Added animation for the galaxy-like background
        width: '100vw',
        height: '100vh',
        position: 'relative',
    };

    const imageStyles = {
        backgroundImage: `url(${customImage})`,
        backgroundSize: '700px 500px',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        animation: 'moveBackground 10s linear infinite', // Added animation for moving the background image
    };

    const keyframes = `@keyframes galaxyBackground {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    @keyframes moveBackground {
        0% {
            background-position: 50% 0%;
        }
        50% {
            background-position: 50% 100%;
        }
        100% {
            background-position: 50% 0%;
        }
    }`;

    return (
        <div style={styles}>
            <div style={imageStyles}></div>
            {/* Your content here */}
            <style>{keyframes}</style>
            <div style={{ position: 'absolute', bottom: 0, width: '100%', marginBottom: '20px' }}>
                <Copyright  sx={{ color: '#ffffff', pt: 4 }}/>
            </div>
>>>>>>> ec424c48beb9050062d0efaa721c116605bd3350
        </div>
    );
};

export default Home;
