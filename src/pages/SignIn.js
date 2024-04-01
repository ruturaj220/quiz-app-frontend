import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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






const defaultTheme = createTheme();

const SignIn = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/login", {
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
            </Container>
        </ThemeProvider>
    );
}

export default SignIn;