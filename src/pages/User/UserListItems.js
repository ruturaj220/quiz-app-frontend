import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link,  useNavigate} from "react-router-dom";
import QuizIcon from '@mui/icons-material/Quiz';
import Swal from "sweetalert2";
import HomeIcon from "@mui/icons-material/Home";
const handleLogout = () => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You will be logged out of the system.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, log me out!'
    }).then((result) => {
        if (result.isConfirmed) {
            // Perform the logout action here
            if (result.isConfirmed) {
                window.location.href = '/quiz-app-frontend/'; // Redirect to the home page after logout
            }
        }
    });
};

const useLogoutNavigation = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out of the system.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log me out!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Perform the logout action here
                if (result.isConfirmed) {
                    navigate('/quiz-app-frontend/'); // Use useNavigate for redirection
                }
            }
        });
    };

    return { handleLogout };
};

export const userListItems = ({ username }) =>{
    const { handleLogout } = useLogoutNavigation();
    return(
        <React.Fragment>
            <ListItemButton component={Link} to ={`/user/${username}`}>
                <ListItemIcon>
                    <HomeIcon/>
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton component={Link} to={`/user/${username}/profile`}>
                <ListItemIcon>
                    <AccountCircleIcon/>
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </ListItemButton>
            <ListItemButton component={Link} to={`/user/${username}/quiz`}>
                <ListItemIcon>
                    <QuizIcon/>
                </ListItemIcon>
                <ListItemText primary="Quiz" />
            </ListItemButton>
            {/*<ListItemButton component={Link} to={`/user/${username}/result`}>*/}
            {/*    <ListItemIcon>*/}
            {/*        <AddCircleRoundedIcon/>*/}
            {/*    </ListItemIcon>*/}
            {/*    <ListItemText primary="Result" />*/}
            {/*</ListItemButton>*/}
            <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                    <LogoutIcon/>
                </ListItemIcon>
                <ListItemText primary="Log Out" />
            </ListItemButton>
        </React.Fragment>
    );
}
