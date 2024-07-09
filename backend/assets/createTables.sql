CREATE TABLE IF NOT EXISTS `videoGame` (
    slug VARCHAR (255) PRIMARY KEY,
    name VARCHAR (255),
    img VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS `team` (
    id INT PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    imageUrl VARCHAR (255),
    slugVideoGame VARCHAR (255),
    location VARCHAR (255),
    winRate FLOAT,
    lastUpdateMatches DATETIME,
    modifiedAt DATETIME,
    lastUpdateGlobalsInformations DATETIME,
    FOREIGN KEY (slugVideoGame) REFERENCES `videoGame` (slug)
);


CREATE TABLE IF NOT EXISTS `match` (
    id INT PRIMARY KEY,
    beginAt DATETIME,
    idTeam1 INT,
    idTeam2 INT,
    score1 INT,
    score2 INT,
    slugVideoGame VARCHAR (255),
    tournament VARCHAR (255),
    status VARCHAR (255),
    idSerie INT,
    idWinner INT,
    FOREIGN KEY (idTeam1) REFERENCES `team` (id),
    FOREIGN KEY (idTeam2) REFERENCES `team` (id),
    FOREIGN KEY (slugVideoGame) REFERENCES `videoGame` (slug)
);

CREATE TABLE IF NOT EXISTS `user` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    civility VARCHAR (255) NOT NULL,
    firstName VARCHAR (255) NOT NULL,
    lastName VARCHAR (255) NOT NULL,
    dateOfBirth DATE NOT NULL,
    countryOfBirth VARCHAR (255) NOT NULL,
    cityOfBirth VARCHAR (255) NOT NULL,
    email VARCHAR (255) NOT NULL,
    emailVerificationToken VARCHAR (255),
    emailVerified BOOLEAN,
    phoneNumber VARCHAR (20) NOT NULL,
    address VARCHAR (255) NOT NULL,
    complementAddress VARCHAR (255),
    city VARCHAR (255) NOT NULL,
    passwordResetToken VARCHAR (255),
    passwordResetTokenExpiration DATETIME,
    password VARCHAR (255) NOT NULL,
    balance INT DEFAULT 0,
    receiveOffers BOOLEAN,
    depositLimit INT,
    betLimit INT,
    automaticWithdraw FLOAT,
    selfExclusion BOOLEAN,
    selfExclusionDate DATETIME,
    currency VARCHAR (255) DEFAULT '€',
    language VARCHAR (255) DEFAULT 'FR',
    timezone VARCHAR (255) DEFAULT 'UTC+2',
    theme VARCHAR (255) DEFAULT 'light',
    FOREIGN KEY (countryOfBirth) REFERENCES `country` (name)
);

CREATE TABLE IF NOT EXISTS `bet` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    matchId INT,
    value VARCHAR (255),
    teamId INT,
    rating FLOAT,
    finished BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (userId) REFERENCES `user` (id) ON DELETE CASCADE,
    -- FOREIGN KEY (matchId) REFERENCES `match` (id) ON DELETE CASCADE,
    FOREIGN KEY (teamId) REFERENCES `team` (id)
);

CREATE TABLE IF NOT EXISTS `player` (
    id INT PRIMARY KEY,
    active BOOLEAN,
    age INT,
    birthday DATE,
    firstName VARCHAR (255),
    imageUrl VARCHAR (255),
    lastName VARCHAR (255),
    modifiedAt DATETIME,
    name VARCHAR (255),
    nationality VARCHAR (255),
    role VARCHAR (255),
    slug VARCHAR (255),
    idTeam INT,
    FOREIGN KEY (idTeam) REFERENCES `team` (id)
);

-- CREATE TABLE IF NOT EXISTS `game` (
--     id INT PRIMARY KEY,
--     beginAt DATETIME,
--     endAt DATETIME,
--     idMatch INT,
--     status VARCHAR(255),
--     position INT,
--     winnerId INT,
--     FOREIGN KEY (idMatch) REFERENCES `match`(id),
--     FOREIGN KEY (winnerId) REFERENCES `team`(id),
-- );