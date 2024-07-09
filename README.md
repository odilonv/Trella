# Trella

## Version: 1.0.0

Trella est une application web comme trello mais en mieux.

---

### Auteurs

- ESCLAPEZ Loïc
- DIMECK Raphaël
- SALAÜN Kerrian
- VIDAL Odilon

---

### Installation

Pour installer Trella, suivez ces étapes :

1. Clonez ce dépôt sur votre machine locale.
2. Accédez au répertoire cloné.
3. Exécutez la commande suivante pour installer les dépendances du frontend et du backend :

    ```
    npm install
    ```

---

### Installation de la base de données

Pour installer et configurer la base de données pour Trella, suivez ces étapes :

*Prérequis : Docker desktop doit être installé sur votre machine.*

1. Lancer les conteneurs Docker :

    ```
    npm run database
    ```

2. Configurer la connexion à la base de données :
    - Name : `Trella_db@localhost`
    - Host : `localhost`
    - Port : `3306`
    - User : `admin`
    - Password : `admin`
    - Database : `Trella_db`
    - URL : `jdbc:mysql://localhost:3306/Trella_db`

---

### Utilisation

Pour lancer l'application en mode développement, exécutez la commande suivante :

    npm run dev

Cela lancera le serveur backend et démarrera le frontend.

---

### Scripts disponibles

- `npm start`: Lance le serveur backend.
- `npm run client`: Démarre le frontend.
- `npm run server`: Lance le serveur backend.
- `npm run dev`: Démarre à la fois le serveur backend et le frontend en mode développement.
- `npm test`: Exécute les tests. *(Actuellement non spécifié)*

---

### Licence

*(Actuellement non spécifié)*

---

N'hésitez pas à contribuer ou à signaler des problèmes en créant une issue.


