import React from "react";
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
        </div>
    );
};

export default Home;
