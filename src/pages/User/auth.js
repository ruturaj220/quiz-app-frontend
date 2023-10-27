// auth.js
import { useNavigate } from 'react-router-dom';

export const useLogoutNavigation = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform your logout actions here

        // Redirect to the home page after logout
        navigate('/quiz-app-frontend/');
    };

    return { handleLogout };
};
