class UserSession {

    static isActive(req) {
        return req.session.user !== undefined;
    }

    static async checkEmailExists(email) {
        const response = await fetch('/api/session/checkEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email})
        });
        const data = await response.json();
        return data.exists;
    }
}

export default UserSession;