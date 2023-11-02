import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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

const defaultTheme = createTheme();

const SignUp = () => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: "",
    });

    const { firstName, lastName, username, password, email } = user;

    const [fNameError, setFNameError] = React.useState("");
    const [lNameError, setLNameError] = React.useState("");
    const [usernameError, setUsernameError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");
    const [emailError, setEmailError] = React.useState("");


    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
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
            setUsernameError("Username is required");
            formIsValid = false;
        }

        // Validate password
        if (!user.password.trim()) {
            setPasswordError("Password is required");
            formIsValid = false;
        } else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/.test(user.password)) {
            setPasswordError("Password must contain at least one uppercase letter, one digit, and one of the special characters: @, $, !, %, *, ?, & or #");
            formIsValid = false;
        } else if (user.password.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            formIsValid = false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!user.email.trim()) {
            setEmailError("Email is required");
            formIsValid = false;
        } else if (!emailRegex.test(user.email.trim())) {
            setEmailError("Invalid email address");
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

    const checkPasswordStrength = (password) => {
        if (password.length === 0) {
            return 'Password should contain at least one special character (@, $, !, %, *, ?, & or #).';
        }
        if (password.length < 6) {
            return 'Password should be at least 6 characters long.';
        }
        if (!/\d/.test(password)) {
            return 'Password should contain at least one digit.';
        }
        if (!/[A-Z]/.test(password)) {
            return 'Password should contain at least one uppercase letter.';
        }
        if (!/[@$!%*?&#]/.test(password)) {
            return 'Password should contain at least one special character (@, $, !, %, *, ?, & or #).';
        }
        return '';
    };

    const handlePasswordFocus = () => {
        const passwordStrengthError = checkPasswordStrength(password);
        if (!passwordStrengthError) {
            setPasswordError(""); // Clear the password error message
        } else {
            setPasswordError(passwordStrengthError); // Display the password warning
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            try {
                const response = await axios.post('https://quiz-app-backend-production-1b1c.up.railway.app/user/create', user);
                if (response.status === 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Done',
                        text: 'Registered Successfully!',
                    });


                    // Reset the form
                    setUser({
                        firstName: "",
                        lastName: "",
                        username: "",
                        password: "",
                        email: "",
                    });
                }
            } catch (error) {
                if (error.response) {
                    const errorMessage = error.response.data.message;
                    console.log(errorMessage)
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
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setUser({ ...user, password: newPassword });

        const passwordStrengthError = checkPasswordStrength(newPassword);
        setPasswordError(passwordStrengthError);
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
                                    onChange={(e) => onInputChange(e)}
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
                                    onChange={(e) => onInputChange(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!(usernameError && usernameError.length)}
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    value={username}
                                    onChange={(e) => onInputChange(e)}
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
                                    onChange={handlePasswordChange}
                                    onFocus={handlePasswordFocus}
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
                                    onChange={(e) => onInputChange(e)}
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
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}

export default SignUp;
