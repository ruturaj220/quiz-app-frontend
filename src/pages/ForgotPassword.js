import React, { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [buttonClicked, setButtonClicked] = useState(false);

    const navigate = useNavigate();
    const isPasswordValid = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
        return regex.test(password);
    };

    const handleButtonPress = () => {
        setButtonClicked(true);
        setTimeout(() => {
            setButtonClicked(false);
        }, 300);
    };
    const handleSendOTP = async () => {
        try {
            const response = await axios.get(`https://quiz-app-backend-production-1b1c.up.railway.app/mail/forgotPassword/${email}`);
            // Handle response

            console.log(response);
            Swal.fire({
                icon: 'success',
                title: 'OTP sent successfully',
                text: 'An OTP has been sent to your email.',
            });
            setOtpSent(true);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Failed to send OTP',
                text: 'There was an error while trying to send the OTP. Please try again later!',
            });
        }
    };

    const handleUpdatePassword = async () => {
        if (!isPasswordValid(newPassword)) {
            setPasswordError("Password does not meet the requirements.");
            return;
        }
        try {
            const response = await axios.put(`http://localhost:8080/mail/updatePassword?email=${email}&otp=${otp}&newPassword=${newPassword}`);
            console.log(response.data);
            Swal.fire({
                icon: 'success',
                title: 'Password updated successfully',
                text: 'Your password has been updated successfully.',
            }).then(() => {
                navigate("/signIn");
            });
        } catch (error) {
            console.log(error.response);
            if (error.response.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid OTP',
                    text: 'The OTP you entered is invalid. Please try again.',
                });
            } else if (error.response.status === 404) {
                Swal.fire({
                    icon: 'error',
                    title: 'User not found',
                    text: 'User not found with this email. Please check your email and try again.',
                });
            } else if (error.response.status === 500) {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to update password',
                    text: 'There was an error while trying to update your password. Please try again later!',
                });
            }
        }
    };

    const checkPasswordStrength = (password) => {
        if (password.length === 0) {
            return "Enter a password.";
        }
        if (password.length < 6) {
            return "Password should be at least 6 characters long.";
        }
        if (!/\d/.test(password)) {
            return "Password should contain at least one digit.";
        }
        if (!/[A-Z]/.test(password)) {
            return "Password should contain at least one uppercase letter.";
        }
        if (!/[@$!%*?&#]/.test(password)) {
            return "Password should contain at least one special character (@, $, !, %, *, ?, & or #).";
        }
        return "";
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Forgot Password
            </Typography>
            <TextField
                fullWidth
                id="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mt: 3 }}
            />
            <Button
                variant="contained"
                onClick={() => {
                    handleSendOTP();
                    handleButtonPress();
                }}
                sx={{
                    mt: 3,
                    transition: "transform 0.3s",
                    transform: buttonClicked ? "scale(0.95)" : "scale(1)",
                }}
            >
                Send OTP
            </Button>
            {otpSent && (
                <>
                    <TextField
                        fullWidth
                        id="otp"
                        label="OTP"
                        variant="outlined"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        sx={{ mt: 3 }}
                    />
                    <TextField
                        fullWidth
                        type="password"
                        id="newPassword"
                        label="New Password"
                        variant="outlined"
                        value={newPassword}
                        onChange={(e) => {
                            setNewPassword(e.target.value);
                            setPasswordError(checkPasswordStrength(e.target.value));
                        }}
                        onFocus={() =>
                            setPasswordError(
                                "Password should contain at least one special character (@, $, !, %, *, ?, & or #), one digit, and one uppercase letter."
                            )
                        }
                        sx={{ mt: 3 }}
                    />
                    {passwordError && (
                        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                            {passwordError}
                        </Typography>
                    )}
                    <Button
                        variant="contained"
                        onClick={() => {
                            handleUpdatePassword();
                            handleButtonPress();
                        }}
                        sx={{
                            mt: 3,
                            transition: "transform 0.3s",
                            transform: buttonClicked ? "scale(0.95)" : "scale(1)",
                        }}
                        disabled={!newPassword || passwordError !== ""}
                    >
                        Submit
                    </Button>
                </>
            )}
        </Container>
    );
};

export default ForgotPassword;
