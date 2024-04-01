import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import {
    Card,
    CardContent,
    Typography,
    Grid,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControlLabel, Radio, FormControl, RadioGroup
} from '@mui/material';
import {useParams} from "react-router-dom";

const useStyles = {
    cardBox: {
        maxWidth: 300,
        margin: '10px',
        padding: '10px',
        backgroundColor: 'lightblue',
        transition: 'background-color 0.3s',
        '&:hover': {
            backgroundColor: 'lightcoral',
        },
    },
    card: {
        width: '300px',
        margin: '1rem',
        transition: 'transform 0.2s',
        '&:hover': {
            transform: 'scale(1.05)',
        },
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    boldUnderline: {
        fontWeight: 'bold',
        textDecoration: 'underline',
        color: 'blue',
        transition: 'color 0.3s',
        '&:hover': {
            color: 'red',
        },
    },
    playButton: {
        margin: '8px 0',
    },
};

const Quiz = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [values, setValues] = useState([]);
    const [selectedQuizId, setSelectedQuizId] = useState(null);
    const [ selectedQuizTitle,setSelectedQuizTitle] = useState(null);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const { username } = useParams();


    useEffect(() => {
        axios
            .get('http://localhost:8080/quiz/getAllQuiz')
            .then((response) => {
                setQuizzes(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleChange = (event, index) => {
        const newValues = [...values];
        newValues[index] = event.target.value;
        setValues(newValues);
    };

    const handleShowQuestions = async (quizId) => {
        try {
            const response = await axios.get(`http://localhost:8080/quiz/getQuizQuestion/${quizId}`);
            setQuizQuestions(response.data);
            setValues(new Array(response.data.length).fill(''));
            console.log(response.data);
            setIsQuizModalOpen(true);
            setSelectedQuizId(quizId);
            const totalQuestionsInQuiz = response.data.length;
            console.log("Total questions in the quiz:", totalQuestionsInQuiz);
            setTotalQuestions(totalQuestionsInQuiz);
            const selectedQuiz = quizzes.find((quiz) => quiz.id === quizId);
            if (selectedQuiz) {
                setSelectedQuizTitle(selectedQuiz.quizTitle);
                console.log(selectedQuiz.quizTitle);
            } else {
                console.error('Selected quiz not found in the list.');
                setSelectedQuizTitle('');
            }

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch quiz questions. Please try again later.'
            });
        }
    };

    const handleCloseModal = () => {
        setIsQuizModalOpen(false);
    };

    const handleSubmit = async (id) => {
        if (id === undefined || isNaN(id)) {
            console.error("Invalid quiz id:", id);
            return;
        }

        const responses = [];

        quizQuestions.forEach((question, index) => {
            const userResponse = values[index] || null;
            if (userResponse !== null) {
                responses.push({
                    questionId: question.queId,
                    response: userResponse
                });
            }
        });

        console.log("Submitting with the following responses:", responses);

        try {
            const response = await axios.post(`http://localhost:8080/quiz/submit/${id}`, responses);
            console.log(response.data); // do something with the response if needed
            const { data: score } = response;
            if (response.status === 200) {

                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Quiz submitted successfully.'
                }).then(async () => {
                    // Prompt the user to confirm if they want to know their score
                    Swal.fire({
                        icon: 'question',
                        title: 'Check Your Score',
                        text: 'Do you want to know your score?',
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No'
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            // Retrieve the email from the user profile
                            const userProfileResponse = await axios.get(`http://localhost:8080/user/${username}`);
                            const userEmail = userProfileResponse.data.email;
                            console.log(response.data);
                            const wrongAnswer = totalQuestions - score;
                            const rightAnswer = totalQuestions- wrongAnswer;
                            const emailMessage = `
    Your score is ${score}. 
    Total questions: ${totalQuestions}
    Right answers: ${rightAnswer}
    Wrong answers: ${wrongAnswer}
`;

                            // Sending the email with the quiz score
                            const mailStructure = {
                                subject: `${selectedQuizTitle} score`,
                                message: emailMessage
                            };

                            await axios.post(`http://localhost:8080/mail/send/${userEmail}`, mailStructure);
                            // Alert the user to check their email
                            Swal.fire({
                                icon: 'info',
                                title: 'Check Your Email',
                                text: 'Your score has been sent to your email.'
                            });
                        } else if (result.dismiss === Swal.DismissReason.cancel) {
                            // Handle the scenario where the user chooses not to see the score
                            Swal.fire({
                                icon: 'info',
                                title: 'Score not shown',
                                text: 'Your score has not been displayed.'
                            });
                        }
                    });
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to submit quiz. Please try again later.'
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to submit quiz. Please try again later.'
            });
        }
    };

    const generateRandomKey = () => {
        return Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    };

    return (
        <Grid container>
            {quizzes.map((quiz) => (
                <Grid item key={quiz.id}>
                    <Box sx={useStyles.cardBox}>
                        <Card sx={useStyles.card}>
                            <CardContent sx={useStyles.cardContent}>
                                <Typography variant="h6" component="div" sx={useStyles.boldUnderline}>
                                    {quiz.quizTitle}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleShowQuestions(quiz.id)}
                                    sx={useStyles.playButton}
                                >
                                    Play
                                </Button>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>
            ))}
            <Dialog
                open={isQuizModalOpen}
                onClose={() => setIsQuizModalOpen(false)}
                sx={{ '& .MuiDialog-paper': { width: '90%', maxHeight: '90%' } }}
            >
                <DialogTitle>Quiz Questions</DialogTitle>
                <DialogContent dividers sx={{ height: '600px', width: '600px' }}>
                    {quizQuestions.map((question, index) => (
                        <div key={generateRandomKey()}>
                            <Typography variant="h6" gutterBottom>
                                Question {index + 1}: {question.questionTittle}
                            </Typography>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    aria-label={`quiz${index}`}
                                    name={`quiz${index}`}
                                    value={values[index] || ''}
                                    onChange={(event) => handleChange(event, index)}
                                >
                                    <FormControlLabel
                                        value="1"
                                        control={<Radio />}
                                        label={question.option1}
                                    />
                                    <FormControlLabel
                                        value="2"
                                        control={<Radio />}
                                        label={question.option2}
                                    />
                                    <FormControlLabel
                                        value="3"
                                        control={<Radio />}
                                        label={question.option3}
                                    />
                                    <FormControlLabel
                                        value="4"
                                        control={<Radio />}
                                        label={question.option4}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsQuizModalOpen(false)}>Close</Button>
                    <Button onClick={() => { handleSubmit(selectedQuizId); handleCloseModal(); }} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default Quiz;