import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/system';
import customAvatarImage from '../Image/admin.png';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';

const StyledCard = styled(Card)({
    maxWidth: 400,
    margin: '0 auto',
    marginTop: 20,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
});

const CustomAvatar = styled('div')({
    width: '100px',
    height: '100px',
    backgroundImage: `url(${customAvatarImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '50%',
    animation: '$spin 2s linear infinite',
});

const StyledTypography = styled(Typography)({
    fontWeight: 'bold',
    textDecoration: 'underline',
    marginBottom: '10px',
});

const Animation = styled('div')({
    '@keyframes spin': {
        '0%': {
            transform: 'rotate(0deg)',
        },
        '100%': {
            transform: 'rotate(360deg)',
        },
    },
});

function UserProfile() {
    const [userData, setUserData] = useState({
        userId: '',
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        email: '',
        admin: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const { username } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:8080/user/${username}`)
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching user data', error);
            });
    }, [username]);

    const handleEditClick = () => {
        setEditedData({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
        });
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        axios
            .put(`http://localhost:8080/user/${userData.userId}`, editedData)
            .then((response) => {
                setUserData({ ...userData, ...editedData });
                setIsEditing(false);
            })
            .catch((error) => {
                console.error('Error updating user data', error);
                setIsEditing(false);
            });
    };

    return (
        <StyledCard>
            <Animation>
                <CustomAvatar />
            </Animation>
            <StyledTypography variant="h4" component="div">
                User Details
            </StyledTypography>
            <Typography variant="h6" component="div">
                User ID: {userData.userId}
            </Typography>
            <Typography variant="h6" component="div">
                First Name: {userData.firstName}
            </Typography>
            <Typography variant="h6" component="div">
                Last Name: {userData.lastName}
            </Typography>
            <Typography variant="h6" component="div">
                Username: {userData.username}
            </Typography>
            <Typography variant="h6" component="div">
                Email: {userData.email}
            </Typography>
            <Typography variant="h6" component="div">
                Password: {userData.password}
            </Typography>
            <Typography variant="h6" component="div">
                isAdmin: {userData.admin === true ? 'True' : 'False'}
            </Typography>
            <Button onClick={handleEditClick}>Edit</Button>
            <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
                <DialogTitle>Edit User Information</DialogTitle>
                <DialogContent>
                    <TextField
                        type="text"
                        value={editedData.firstName}
                        onChange={(e) => setEditedData({ ...editedData, firstName: e.target.value })}
                        placeholder="First Name"
                    />
                    <TextField
                        type="text"
                        value={editedData.lastName}
                        onChange={(e) => setEditedData({ ...editedData, lastName: e.target.value })}
                        placeholder="Last Name"
                    />
                    <TextField
                        type="text"
                        value={editedData.email}
                        onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                        placeholder="Email"
                    />
                    <Button onClick={handleSaveClick}>Save</Button>
                </DialogContent>
            </Dialog>
        </StyledCard>
    );
}

export default UserProfile;