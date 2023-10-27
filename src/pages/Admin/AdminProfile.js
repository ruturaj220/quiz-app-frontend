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

function AdminProfile() {
    const [adminData, setAdminData] = useState({
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
        password: '',
    });

    const username = 'admin';

    useEffect(() => {
        axios
            .get(`https://quiz-app-backend-production-1b1c.up.railway.app/user/${username}`)
            .then((response) => {
                setAdminData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching admin data', error);
            });
    }, [username]);

    const handleEditClick = () => {
        setEditedData({
            firstName: adminData.firstName,
            lastName: adminData.lastName,
            email: adminData.email,
            password: adminData.password,
        });
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        axios
            .put(`https://quiz-app-backend-production-1b1c.up.railway.app/user/${adminData.userId}`, editedData)
            .then((response) => {
                setAdminData({ ...adminData, ...editedData });
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
                Admin Details
            </StyledTypography>
            <Typography variant="h6" component="div">
                User ID: {adminData.userId}
            </Typography>
            <Typography variant="h6" component="div">
                First Name: {adminData.firstName}
            </Typography>
            <Typography variant="h6" component="div">
                Last Name: {adminData.lastName}
            </Typography>
            <Typography variant="h6" component="div">
                Username: {adminData.username}
            </Typography>
            <Typography variant="h6" component="div">
                Email: {adminData.email}
            </Typography>
            <Typography variant="h6" component="div">
                Password: {adminData.password}
            </Typography>
            <Typography variant="h6" component="div">
                isAdmin: {adminData.admin === true ? 'True' : 'False'}
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
                    <TextField
                        type="text"
                        value={editedData.password}
                        onChange={(e) => setEditedData({ ...editedData, password: e.target.value })}
                        placeholder="Password"
                    />
                    <Button onClick={handleSaveClick}>Save</Button>
                </DialogContent>
            </Dialog>
        </StyledCard>
    );
}

export default AdminProfile;
