import * as React from 'react';
import { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import axios from 'axios';
import Swal from "sweetalert2";

const AddQuestions = () => {
    const [question, setQuestion] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [correctOption, setCorrectOption] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newQuestion = {
            questionTittle: question,
            option1: option1,
            option2: option2,
            option3: option3,
            option4: option4,
            correctOption: correctOption,
            category : category,
        };

        try {
            const response = await axios.post('http://localhost:8080/question/addQuestion', newQuestion);

            if (response.status === 201) {
                // Question created successfully
                console.log('Question added successfully');
                Swal.fire({
                    icon: 'success',
                    title: 'Done',
                    text: 'Question added successfully!'
                })
                setQuestion('');
                setOption1('');
                setOption2('');
                setOption3('');
                setOption4('');
                setCategory('');
                setCorrectOption('');
            } else if (response.status === 409) {
                // Conflict - a question with the same content already exists
                setError('Question with the same content already exists');
            } else {
                // Handle other error cases
                setError('Failed to add question');
            }
        } catch (error) {
            // Handle network errors or unexpected errors
            console.error('Error:', error);
            setError('Failed to add question');
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Failed to add question!'
            });
        }
    };

    const resetForm = () => {
        setQuestion('');
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        setCategory('');
        setCorrectOption('');
        setError('');
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Add Question
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Option 1"
                    value={option1}
                    onChange={(e) => setOption1(e.target.value)}
                    required
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Option 2"
                    value={option2}
                    onChange={(e) => setOption2(e.target.value)}
                    required
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Option 3"
                    value={option3}
                    onChange={(e) => setOption3(e.target.value)}
                    required
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Option 4"
                    value={option4}
                    onChange={(e) => setOption4(e.target.value)}
                    required
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="correctOption">Correct Solution</InputLabel>
                    <Select
                        value={correctOption}
                        onChange={(e) => setCorrectOption(e.target.value)}
                        inputProps={{ id: 'correctOption' }}
                        required
                    >
                        <MenuItem value="">
                            <em>Select Correct Solution</em>
                        </MenuItem>
                        <MenuItem value="1">Option 1</MenuItem>
                        <MenuItem value="2">Option 2</MenuItem>
                        <MenuItem value="3">Option 3</MenuItem>
                        <MenuItem value="4">Option 4</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary"  sx={{ marginRight: '16px' }} >
                    Add Question
                </Button>
                <Button type="button" variant="outlined" color="secondary" onClick={resetForm}
                        sx={{
                            color: 'white', // Text color
                            bgcolor: 'red', // Background color
                            '&:hover': {
                                bgcolor: 'darkred', // Hover background color
                            },
                        }}>
                    Reset Form
                </Button>
                {error && (
                    <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}
            </form>
        </Container>
    );
};

export default AddQuestions;
