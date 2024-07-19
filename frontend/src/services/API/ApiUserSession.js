async function login(user) {
    const response = await fetch('http://localhost:5001/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user }),
        credentials: 'include'
    });
    if (response.status === 200) {
        return await response.json();
    } else {
        throw new Error('Nom d\'utilisateur ou mot de passe incorrect');
    }
}

async function signUp(user) {
    try {
        const response = await fetch('http://localhost:5001/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user })
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}

async function logout() {
    const response = await fetch('http://localhost:5001/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    const data = await response.json();
    return data;

}

async function isLogged() {
    const response = await fetch('http://localhost:5001/users/session', {
        method: 'GET',
        credentials: 'include',
    });
    return response.status === 200;
}

async function getLoggedUser() {
    const response = await fetch('http://localhost:5001/users/session', {
        method: 'GET',
        credentials: 'include',
    });

    if (response.status === 200) {
        const data = await response.json();
        return data;
    } else {
        return null;
    }
}


export async function getLoginStatus() {
    const response = await fetch('http://localhost:5001/api/data/session', {
        method: 'GET',
        credentials: 'include',
    });
    return response.status;
}

async function requireLoggedUser() {
    if (await getLoginStatus() === 200) {
        return true;
    } else {
        // window.location.href = `/login`;
    }
}

export async function requireGuestUser() {
    if (await getLoginStatus() === 200) {
        window.location.href = `/`;
    } else {
        return false;
    }
}

async function updateUser(user) {
    const response = await fetch('http://localhost:5001/api/data/session/user', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (response.ok) {
        return await response.json();
    } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error);
    }
}

async function deleteUser(userId, password) {
    const response = await fetch('http://localhost:5001/users/delete', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, password }), 
    });

    return response;
}


async function changePassword(oldPassword, newPassword, confirmPassword) {
    const response = await fetch('http://localhost:5001/api/data/session/changePassword', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
    });

    return response;
}

export {
    login,
    signUp as register,
    logout,
    isLogged,
    requireLoggedUser,
    getLoggedUser,
    updateUser,
    deleteUser,
    changePassword
};