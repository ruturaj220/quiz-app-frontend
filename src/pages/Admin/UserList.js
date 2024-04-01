import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Swal from "sweetalert2";
const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8080/user/getAllUser')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleDelete = (userId) => {
        Swal.fire({
            icon: 'question',
            title: 'Confirmation',
            text: 'Are you sure you want to delete this user?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`http://localhost:8080/user/${userId}`)
                    .then(() => {
                        setUsers(users.filter((user) => user.userId !== userId));
                        Swal.fire({
                            icon: 'success',
                            title: 'User Deleted',
                            text: 'The user has been successfully deleted.',
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Deletion Failed',
                            text: 'Failed to delete the user. Please try again later.',
                        });
                    });
            }
        });
    };

    return (
        <div>
            <h2>User List</h2>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User ID</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.userId}>
                                <TableCell>{user.userId}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(user.userId)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UserList;