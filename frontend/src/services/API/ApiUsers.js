import User from "../../models/User";

async function getUsers() {
    const response = await fetch('http://localhost:5000/api/data/users');
    const data = await response.json();
    return parseArray(data);
}

function parseArray(data) {
    let users = [];
    for (let i = 0; i < data.length; i++) {
        if (User.fromJson(data[i]) != null)
            users.push(User.fromJson(data[i]));
    }
    return users;
}

export { getUsers };