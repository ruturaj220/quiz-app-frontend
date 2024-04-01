import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
<<<<<<< HEAD
=======
import Link from '@mui/material/Link';
>>>>>>> ec424c48beb9050062d0efaa721c116605bd3350
import {Link as RouterLink, useNavigate} from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import {useState} from "react";
import Swal from 'sweetalert2'



<<<<<<< HEAD


=======
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

// TODO remove, this demo shouldn't need to reset the theme.
>>>>>>> ec424c48beb9050062d0efaa721c116605bd3350

const defaultTheme = createTheme();

const SignIn = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
<<<<<<< HEAD
            const response = await axios.post("http://localhost:8080/login", {
=======
            const response = await axios.post("https://quiz-app-backend-production-1b1c.up.railway.app/login", {
>>>>>>> ec424c48beb9050062d0efaa721c116605bd3350
                username: username,
                password: password,
            });

            const role = response.data;
            console.log(response.data);
            // Handle the role based on the response
            if (role === "admin") {
                // navigate("/admin");
                navigate(`/admin`, {state: {username: username}});
            } else if (role === "user") {
                // Redirect to the user page
                // navigate("/user", {state: {username: username}});
                navigate(`/user/${username}`, {state: {username: username}});
                setError("User logged");
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid credentials',
                    text: 'Please check your username and password and try again!',
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Failed to log in',
                text: 'There was an error while trying to log you in. Please try again later!',
            })
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="username"
                            name="username"
                            autoComplete="email"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <div className="text-danger">{error}</div>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>

                        <Grid container>
                            <Grid item xs>
                                <RouterLink to="/forgotPassword">
                                    {"Forgot password?"}
                                </RouterLink>
                            </Grid>
                            <Grid item>
                                <RouterLink to="/signUp" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </RouterLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
<<<<<<< HEAD
=======
                <Copyright sx={{ mt: 8, mb: 4 }} />
>>>>>>> ec424c48beb9050062d0efaa721c116605bd3350
            </Container>
        </ThemeProvider>
    );
}

export default SignIn;