import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Grid, Box, Dialog, DialogTitle, DialogContent } from '@mui/material';

const UserResult = ({ quizId }) => {
    const [userScore, setUserScore] = useState(null);

    useEffect(() => {
        const fetchUserScore = async () => {
            try {
                const response = await axios.post(`https://quiz-app-backend-production-1b1c.up.railway.app/quiz/submit/${quizId}`, {
                    // Include the list of responses here if necessary
                });
                setUserScore(response.data);
            } catch (error) {
                console.error('Error fetching user score:', error);
            }
        };

        fetchUserScore();
    }, [quizId]);

    return (
        <Dialog open={true} onClose={() => {}}>
            <DialogTitle>User Result</DialogTitle>
            <DialogContent>
                <Typography variant="h6" gutterBottom>
                    User Score for Quiz ID {quizId}: {userScore}
                </Typography>
                {/* Include user details here if available */}
            </DialogContent>
        </Dialog>
    );
};

export default UserResult;
