import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import {
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    Button,
} from '@mui/material';

function QuestionList() {
    const { quizId } = useParams();
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch questions for the specified quiz ID when the component mounts
        axios
            .get(`http://localhost:8080/quiz/getQuizQuestion/${quizId}`)
            .then((response) => {
                setQuestions(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [quizId]);

    // Function to navigate back to the QuizList component
    const navigateToQuizList = () => {
        navigate(`/admin/quizlist1`); // Replace with the correct path to QuizList component
    };


    return (
        <div>
            <h2>Questions for Quiz {quizId}</h2>

            <List>
                {questions.map((question) => (
                    <div key={question.queId}>
                        <ListItem>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {question.questionTittle}
                                </Typography>
                                <Divider />
                                <ul>
                                    <li>
                                        <ListItemText primary={question.option1} />
                                    </li>
                                    <li>
                                        <ListItemText primary={question.option2} />
                                    </li>
                                    <li>
                                        <ListItemText primary={question.option3} />
                                    </li>
                                    <li>
                                        <ListItemText primary={question.option4} />
                                    </li>
                                </ul>
                            </CardContent>
                        </ListItem>
                        <Divider />
                    </div>
                ))}
            </List>
            <Button variant="contained" color="primary" onClick={navigateToQuizList}>
                Back to Quiz List
            </Button>
        </div>
    );
}

export default QuestionList;