// UserListItems.js
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import QuizIcon from '@mui/icons-material/Quiz';
import { useLogoutNavigation } from './auth'; // Update the path if needed

export const UserListItems = ({ username }) => {
    const { handleLogout } = useLogoutNavigation();

    return (
        <React.Fragment>
            <ListItemButton component={Link} to={`/user/${username}/profile`}>
                <ListItemIcon>
                    <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </ListItemButton>
            <ListItemButton component={Link} to={`/user/${username}/quiz`}>
                <ListItemIcon>
                    <QuizIcon />
                </ListItemIcon>
                <ListItemText primary="Quiz" />
            </ListItemButton>
            <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
            </ListItemButton>
        </React.Fragment>
    );
};
