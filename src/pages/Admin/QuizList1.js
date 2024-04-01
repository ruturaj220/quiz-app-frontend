import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grow,
    Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

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
    buttonGroup: {
        marginTop: '1rem',
        display: 'flex',
        flexDirection: 'column',
    },
    growButton: {
        transition: 'transform 0.2s',
        '&:hover': {
            transform: 'scale(1.05)',
        },
    },
    button: {
        fontSize: '0.9rem',
        margin: '8px 0',
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
};

function QuizList1() {
    const [quizzes, setQuizzes] = useState([]);
    const [editedQuizTitle, setEditedQuizTitle] = useState('');
    const [editingQuizId, setEditingQuizId] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        axios
<<<<<<< HEAD
            .get('http://localhost:8080/quiz/getAllQuiz')
=======
            .get('https://quiz-app-backend-production-1b1c.up.railway.app/quiz/getAllQuiz')
>>>>>>> ec424c48beb9050062d0efaa721c116605bd3350
            .then((response) => {
                setQuizzes(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this quiz!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.isConfirmed) {
                axios
<<<<<<< HEAD
                    .delete(`http://localhost:8080/quiz/deleteQuiz/${id}`)
=======
                    .delete(`https://quiz-app-backend-production-1b1c.up.railway.app/quiz/deleteQuiz/${id}`)
>>>>>>> ec424c48beb9050062d0efaa721c116605bd3350
                    .then(() => {
                        setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.id !== id));
                        Swal.fire('Deleted!', 'Your quiz has been deleted.', 'success');
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire('Error', 'There was an error deleting the quiz.', 'error');
                    });
            }
        });
    };

    const handleEdit = (id) => {
        const quizToEdit = quizzes.find((quiz) => quiz.id === id);
        setEditingQuizId(id);
        setEditedQuizTitle(quizToEdit.quizTitle);
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = () => {
        axios
<<<<<<< HEAD
            .put(`http://localhost:8080/quiz/update/${editingQuizId}`, { quizTitle: editedQuizTitle })
=======
            .put(`https://quiz-app-backend-production-1b1c.up.railway.app/quiz/update/${editingQuizId}`, { quizTitle: editedQuizTitle })
>>>>>>> ec424c48beb9050062d0efaa721c116605bd3350
            .then(() => {
                setIsEditModalOpen(false);
                const updatedQuizzes = quizzes.map((quiz) =>
                    quiz.id === editingQuizId ? { ...quiz, quizTitle: editedQuizTitle } : quiz
                );
                setQuizzes(updatedQuizzes);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleShowQuestions = (id) => {
        navigate(`/admin/quiz/${id}/questions`);
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
                                <div className="buttonGroup" sx={useStyles.buttonGroup}>
                                    <Grow in timeout={500}>
                                        <div className="growButton">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleEdit(quiz.id)}
                                                sx={useStyles.button}
                                            >
                                                Edit
                                            </Button>
                                        </div>
                                    </Grow>
                                    <Grow in timeout={500}>
                                        <div className="growButton">
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleDelete(quiz.id)}
                                                sx={useStyles.button}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </Grow>
                                    <Grow in timeout={500}>
                                        <div className="growButton">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleShowQuestions(quiz.id)}
                                                sx={useStyles.button}
                                            >
                                                Show
                                            </Button>
                                        </div>
                                    </Grow>
                                </div>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>
            ))}

            <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                <DialogTitle>Edit Quiz Title</DialogTitle>
                <DialogContent>
                    <TextField
                        label="New Quiz Title"
                        value={editedQuizTitle}
                        onChange={(e) => setEditedQuizTitle(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSaveEdit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}

export default QuizList1;
