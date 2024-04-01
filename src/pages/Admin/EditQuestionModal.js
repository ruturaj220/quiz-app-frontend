import React, { useState } from "react";
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    // IconButton,
} from "@mui/material";

const EditQuestionModal = ({ question, onUpdateQuestion, onClose }) => {
    const [editedQuestion, setEditedQuestion] = useState(question);

    const handleChange = (e) => {
        setEditedQuestion((prevQuestion) => ({
            ...prevQuestion,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateQuestion(editedQuestion);
    };

    return (
        <Modal open={true} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                    Edit Question
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Question"
                        name="questionTittle"
                        value={editedQuestion.questionTittle}
                        onChange={handleChange}
                        required
                        sx={{ marginBottom: 2 }}
                    />
                    {/* Add input fields for other question properties (options, correct solution, etc.) */}
                    {/* For example: */}
                    <TextField
                        fullWidth
                        label="Option 1"
                        name="option1"
                        value={editedQuestion.option1}
                        onChange={handleChange}
                        required
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Option 2"
                        name="option2"
                        value={editedQuestion.option2}
                        onChange={handleChange}
                        required
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Option 3"
                        name="option3"
                        value={editedQuestion.option3}
                        onChange={handleChange}
                        required
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Option 4"
                        name="option4"
                        value={editedQuestion.option4}
                        onChange={handleChange}
                        required
                        sx={{ marginBottom: 2 }}
                    />
                    {/* Add more option fields as needed */}
                    <TextField
                        fullWidth
                        label="Correct Option"
                        name="correctOption"
                        value={editedQuestion.correctOption}
                        onChange={handleChange}
                        required
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Category"
                        name="category"
                        value={editedQuestion.category}
                        onChange={handleChange}
                        required
                        sx={{ marginBottom: 2 }}
                    />
                    <Box sx={{ textAlign: "right" }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ marginRight: 2 }}
                        >
                            Update
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default EditQuestionModal;