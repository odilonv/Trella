import { getUsers, getUser, updateUserDetails, createUser, authenticateUser, sendPasswordResetLink, verifyEmail } from './userService.js';

export const getAllUsers = (req, res) => {
    const users = getUsers();
    res.status(200).json(users);
};

export const getUserById = (req, res) => {
    const { userId } = req.params;
    const user = getUser(userId);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).send('User not found');
    }
};

export const updateUser = (req, res) => {
    const { userId } = req.params;
    const updatedUser = updateUserDetails(userId, req.body);
    if (updatedUser) {
        res.status(200).json(updatedUser);
    } else {
        res.status(404).send('User not found');
    }
};

export const signup = (req, res) => {
    const newUser = createUser(req.body);
    res.status(201).json(newUser);
};

export const login = (req, res) => {
    const token = authenticateUser(req.body);
    if (token) {
        res.status(200).json({ token });
    } else {
        res.status(401).send('Unauthorized');
    }
};

export const forgotPassword = (req, res) => {
    const result = sendPasswordResetLink(req.body.email);
    if (result) {
        res.status(200).send('Password reset link sent successfully');
    } else {
        res.status(404).send('User not found');
    }
};

export const validateEmail = (req, res) => {
    const result = verifyEmail(req.body.email);
    if (result) {
        res.status(200).send('Email validated successfully');
    } else {
        res.status(404).send('User not found');
    }
};
