# Trella

## Version: 1.0.0

Trella is a microservice architecture application designed to function similarly to Trello. It offers project management capabilities where users can create boards, lists, and cards to organize cards and workflows efficiently.

---

### Authors

- ESCLAPEZ Loïc
- DIMECK Raphaël
- SALAÜN Kerrian
- VIDAL Odilon

---

### Architecture

![Trella Architecture](docs/Trella%20Architecture%20Diagram.svg)

---

### Installation

To install Trella, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the cloned directory.
3. Run the following command to install the frontend and backend dependencies:

    ```
    npm install
    ```

---

### Installation de la base de données

To install and configure the database for Trella, follow these steps:

1. Start the Docker containers:

    ```
    npm run database
    ```

2. Configure the database connection:
    - Name : `Trella_db@localhost`
    - Host : `localhost`
    - Port : `3306`
    - User : `admin`
    - Password : `admin`
    - Database : `trella_db`
    - URL : `jdbc:mysql://localhost:3307/Trella_db`

---

### Usage
To run the application in development mode, execute the following command:

    npm run dev

This will start the backend server and launch the frontend.

---

### Available Scripts

- `npm run client`: Starts the frontend.
- `npm run server`: Starts the backend server.
- `npm run dev`:  Starts both the backend server and the frontend in development mode.
- `npm test`:  Runs the tests. (Currently unspecified)

---

### Licence

This project is licensed under the MIT License.

---

