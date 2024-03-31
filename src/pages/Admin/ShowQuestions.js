import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Container,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Paper,
} from "@mui/material";
import Swal from "sweetalert2";
import EditQuestionModal from "./EditQuestionModal";
// Import Material-UI components as needed

export const ShowQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState("");
    const [editedQuestion, setEditedQuestion] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);


    const fetchQuestions = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/question/allQuestions"
            );

            if (response.status === 200) {
                // If the request is successful (status code 200), update the state with the data
                setQuestions(response.data);
            } else {
                // If the request is not successful, handle the error
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: "Failed to fetch questions.",
                });
            }
        } catch (error) {
            // If an exception occurs (e.g., network error), handle the error
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Failed to fetch questions.",
            });
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);
    async function handleDeleteQuestion(id) {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                await axios.delete(`http://localhost:8080/question/${id}`);
                await Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );
                fetchQuestions(); // Refresh the question list
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Failed to delete the question.",
            });
        }

    }

    const handleEditQuestion = (question) => {
        setEditedQuestion({ ...question, id: question.queId });
        setShowEditModal(true);
    };

    const handleUpdateQuestion = async (updatedQuestion) => {
        try {
            await axios.put(
                `http://localhost:8080/question/${updatedQuestion.id}`,
                updatedQuestion
            );
            fetchQuestions(); // Refresh the question list
            setShowEditModal(false); // Close the edit modal
        } catch (error) {
            setError("Failed to update question");
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Show Questions
            </Typography>
            {questions.length > 0 ? (
                <Paper elevation={3}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Question</TableCell>
                                <TableCell>Option 1</TableCell>
                                <TableCell>Option 2</TableCell>
                                <TableCell>Option 3</TableCell>
                                <TableCell>Option 4</TableCell>
                                <TableCell>Correct Solution</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {questions.map((question) => (
                                <TableRow key={question.queId}>
                                    <TableCell>{question.queId}</TableCell>
                                    <TableCell>{question.questionTittle}</TableCell>
                                    <TableCell>{question.option1}</TableCell>
                                    <TableCell>{question.option2}</TableCell>
                                    <TableCell>{question.option3}</TableCell>
                                    <TableCell>{question.option4}</TableCell>
                                    <TableCell>{question.correctOption}</TableCell>
                                    <TableCell>{question.category}</TableCell>
                                    <TableCell>
                                        {/* Add action buttons */}
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            sx={{ marginBottom: '8px' }}
                                            onClick={() => handleDeleteQuestion(question.queId)}
                                        >
                                            Delete
                                        </Button>
                                        {/* Add edit button */}
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleEditQuestion(question)}
                                        >
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            ) : (
                <Typography variant="body1">No questions found</Typography>
            )}
            {showEditModal && (
                <EditQuestionModal
                    question={editedQuestion}
                    onUpdateQuestion={handleUpdateQuestion}
                    onClose={() => setShowEditModal(false)}
                />
            )}
            {error && <Typography variant="body2" color="error">{error}</Typography>}
        </Container>
    );
};

export default ShowQuestions;
