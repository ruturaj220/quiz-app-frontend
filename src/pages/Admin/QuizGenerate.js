import React, {useCallback, useEffect, useState} from 'react';
import {Container, Typography, TextField, Button, Box, MenuItem, Select} from '@mui/material';
import axios from 'axios';
import Swal from "sweetalert2";
function QuizGenerate() {
    const [categories, setCategories] = useState([]);
    const [numQ, setNumQ] = useState(0);
    const [quizTitle, setQuizTitle] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [availableQuestions, setAvailableQuestions] = useState(0);


    const fetchCategories = useCallback(async () => {
        try {
            const response = await axios.get('https://quiz-app-backend-production-1b1c.up.railway.app/question/allQuestions');
            const allCategories = response.data.map((question) => question.category);
            const uniqueCategories = [...new Set(allCategories)]; // Using Set to get unique values
            setCategories(uniqueCategories);
            // Filter the questions based on the selected category
            const filteredQuestions = response.data.filter((question) => question.category === selectedCategory);
            const availableQuestionsCount = filteredQuestions.length;
            setAvailableQuestions(availableQuestionsCount);
        } catch (error) {
            console.error('Failed to fetch categories', error);
        }
    }, [selectedCategory]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleSubmit = async  () => {

        if (!selectedCategory) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Please select a category.',
            });
            return;
        }
        if (numQ <= 0 || numQ > availableQuestions) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: `Please enter a valid number of questions. Available questions: ${availableQuestions}`,
            });
            return;
        }
        if (!quizTitle.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Please enter a valid quiz title.',
            });
            return;
        }

        console.log(availableQuestions);
        if (categories.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'No questions available for the selected category. Quiz creation failed.',
            });
            return;
        }

        if (numQ > availableQuestions) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: `Number of requested questions (${numQ}) exceeds the number of available questions (${availableQuestions}). Please choose a smaller number of questions.`,
            });
            return;
        }


        try {
            const response = await axios.post(
                `https://quiz-app-backend-production-1b1c.up.railway.app/quiz/create?category=${selectedCategory}&numQ=${numQ}&quizTitle=${quizTitle}`
            );

            if (response.status === 201) {
                // Show success message if the quiz is created successfully
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Quiz created successfully',
                });

            } else {
                // Show error message if the quiz creation fails
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to create the quiz',
                });
                // Handle errors
            }
        } catch (error) {
            // Show error message if the request fails
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to create the quiz',
            });
            console.error('Failed to create quiz', error);
            // Handle errors
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h2" gutterBottom>
                Quiz Generation
            </Typography>
            <Box my={2}>
                <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value="" disabled>
                        Select a category
                    </MenuItem>
                    {categories.map((category, index) => (
                        <MenuItem key={index} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
            <Box my={2}>
                <TextField
                    label="Number of Questions"
                    type="number"
                    fullWidth
                    value={numQ}
                    onChange={(e) => setNumQ(e.target.value)}
                />
            </Box>
            <Box my={2}>
                <TextField
                    label="Quiz Title"
                    fullWidth
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                />
            </Box>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Generate Quiz
            </Button>
        </Container>
    );
}

export default QuizGenerate;
