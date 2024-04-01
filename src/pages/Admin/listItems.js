import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import QuizIcon from '@mui/icons-material/Quiz';
import SlideshowTwoToneIcon from '@mui/icons-material/SlideshowTwoTone';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ListAltIcon from '@mui/icons-material/ListAlt';
import {Link} from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from '@mui/icons-material/Home';
import Swal from "sweetalert2";

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
                window.location.href = '/'; // Redirect to the home page after logout
            }
        }
    });
};

export const mainListItems =  (

    <React.Fragment>
        <ListItemButton component={Link} to ='/admin'>
            <ListItemIcon>
                <HomeIcon/>
            </ListItemIcon>
            <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link} to ='/admin/profile'>
            <ListItemIcon>
                <AccountCircleIcon/>
            </ListItemIcon>
            <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton component={Link} to='/admin/addQuestions'>
            <ListItemIcon>
                <AddCircleRoundedIcon/>
            </ListItemIcon>
            <ListItemText primary="Add Question" />
        </ListItemButton>
        <ListItemButton component={Link} to='/admin/allQuestions'>
            <ListItemIcon>
                <ListAltIcon/>
            </ListItemIcon>
            <ListItemText primary="Show Question" />
        </ListItemButton>
        <ListItemButton component={Link} to='/admin/quizGenerate'>
            <ListItemIcon>
                <QuizIcon/>
            </ListItemIcon>
            <ListItemText primary="Generate Quiz" />
        </ListItemButton>
        <ListItemButton component={Link} to='/admin/quizList1'>
            <ListItemIcon>
                <SlideshowTwoToneIcon/>
            </ListItemIcon>
            <ListItemText primary="Show Quiz" />
        </ListItemButton>
        <ListItemButton component={Link} to='/admin/getAllUser'>
            <ListItemIcon>
                <FormatListBulletedIcon/>
            </ListItemIcon>
            <ListItemText primary="Users" />
        </ListItemButton>
        <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
                <LogoutIcon/>
            </ListItemIcon>
            <ListItemText primary="Log Out" />
        </ListItemButton>
    </React.Fragment>
);

