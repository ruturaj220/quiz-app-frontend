import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from "react";
import axios from "axios";

import Swal from "sweetalert2";





// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const SignUp = () => {

    const [user,setUser] = useState({
        firstName:"",
        lastName:"",
        username:"",
        password:"",
        email:"",
    });


    const {firstName,lastName,username,password,email} = user;

    const [fNameError,setFNameError] = React.useState("");
    const [lNameError,setLNameError] = React.useState("");
    const [usernameError,setUsernameError] = React.useState("");
    const [passwordError,setPasswordError] = React.useState("");
    const [emailError,setEmailError] = React.useState("");


    const onInputChange = (e) => {
        setUser({...user,[e.target.name] : e.target.value});
    }

    const validateForm = () => {
        let formIsValid = true;

        // Validate firstName
        if (!user.firstName.trim()) {
            setFNameError("First Name is required");
            formIsValid = false;
        }

        // Validate lastName
        if (!user.lastName.trim()) {
            setLNameError("Last Name is required");
            formIsValid = false;
        }

        // Validate username
        if (!user.username.trim()) {
            setUsernameError("username is required");
            formIsValid = false;
        }

        // Validate password
        if (!user.password.trim()) {
            setPasswordError("password is required");
            formIsValid = false;
        }

        // Validate email
        if (!user.email.trim()) {
            setEmailError("email is required");
            formIsValid = false;
        }


        return formIsValid;
    };
    const showError = (errorTitle, errorMessage) => {
        Swal.fire({
            icon: 'error',
            title: errorTitle,
            text: errorMessage,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();




        if (validateForm()) {
            try {
                const response = await axios.post('http://localhost:8080/user/create', user);
                if (response.status === 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Done',
                        text: 'Registered Successfully!',
                    });
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 409) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Username Already Exists',
                            text: 'Username Already Exists',
                        });
                    } else if (error.response.status === 400) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Email Already Exists',
                            text: 'Email Already Exists',
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong! Please try again.',
                        });
                    }
                }

            }
        } else {
            showError('Oops...', 'Fill in all the required fields!');
        }

    };
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={(event) => handleSubmit(event)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={!!(fNameError && fNameError.length)}
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    helperText={fNameError}
                                    autoFocus
                                    value={firstName}
                                    onChange={(e)=>onInputChange(e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={!!(lNameError && lNameError.length)}
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    value={lastName}
                                    autoComplete="family-name"
                                    helperText={lNameError}
                                    onChange={(e)=>onInputChange(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!(usernameError && usernameError.length)}
                                    required
                                    fullWidth
                                    id="username"
                                    label="username"
                                    name="username"
                                    value={username}
                                    onChange={(e)=>onInputChange(e)}
                                    helperText={usernameError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!(passwordError && passwordError.length)}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    helperText={passwordError}
                                    value={password}
                                    onChange={(e)=>onInputChange(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!(emailError && emailError.length)}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    value={email}
                                    autoComplete="email"
                                    helperText={emailError}
                                    onChange={(e)=>onInputChange(e)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <RouterLink to="/signIn" variant="body2">
                                    {" Already have an account? Login"}
                                </RouterLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default SignUp;