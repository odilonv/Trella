const users = [];

export const getUsers = () => {
    return users;
};

export const getUser = (id) => {
    return users.find(user => user.id === id);
};

export const updateUserDetails = (id, userDetails) => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...userDetails };
        return users[userIndex];
    }
    return null;
};

export const createUser = (userData) => {
    const newUser = { id: `${users.length + 1}`, ...userData };
    users.push(newUser);
    return newUser;
};

export const authenticateUser = ({ email, password }) => {
    const user = users.find(user => user.email === email && user.password === password);
    return user ? 'fake-jwt-token' : null;
};

export const sendPasswordResetLink = (email) => {
    const user = users.find(user => user.email === email);
    return user ? true : false;
};

export const verifyEmail = (email) => {
    const user = users.find(user => user.email === email);
    return user ? true : false;
};
