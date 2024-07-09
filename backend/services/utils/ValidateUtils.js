function checkUppercase(password) {
    return /[A-Z]/.test(password) ? null : "Le mot de passe doit contenir au moins une lettre majuscule.";
}

function checkSpecialCharacter(password) {
    return /[!@#$&*%_-]/.test(password) ? null : "Le mot de passe doit contenir au moins un caractère spécial.";
}

function checkDigit(password) {
    return /[0-9]/.test(password) ? null : "Le mot de passe doit contenir au moins un chiffre.";
}

function checkIsEmail(email) {
    if (!email) return "L'adresse email est requise.";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? null : "Adresse email invalide.";
}

function checkIsPhoneNumber(phoneNumber) {
    if (!phoneNumber) return "Le numéro de téléphone est requis.";
    return /^\d{10}$/.test(phoneNumber) ? null : "Numéro de téléphone invalide.";
}

function checkAge(dateOfBirth) {
    if (!dateOfBirth) return "La date de naissance est requise.";
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
        age--;
    }
    else if (age < 18)
        return "Tu dois avoir au moins 18 ans pour t'inscrire.";
    else if (age > 114)
        return "Tu es trop vieux.";
    return null;
};

function checkOnlyAlphabets(name) {
    if (!name) return "Ce champ est requis.";
    return /^[a-zA-ZÀ-ÿ- ]+$/.test(name) ? null : "Ce champ ne doit contenir que des lettres.";
}

// can container spaces, only alphabets, -
function checkCity(city) {
    if (!city) return "La ville est requise.";
    return /^[a-zA-Z- ]+$/.test(city) ? null : "La ville ne doit contenir que des lettres.";
}

function checkPassword(password) {
    if (!password) return "Le mot de passe est requis.";
    if (password.length < 8) return "Le mot de passe doit contenir au moins 8 caractères.";
    const uppercase = checkUppercase(password);
    if (uppercase !== null) return uppercase;
    const specialCharacter = checkSpecialCharacter(password);
    if (specialCharacter !== null) return specialCharacter;
    const digit = checkDigit(password);
    if (digit !== null) return digit;
    return null;
}


export { checkIsEmail, checkCity, checkPassword, checkIsPhoneNumber, checkAge, checkUppercase, checkSpecialCharacter, checkDigit, checkOnlyAlphabets };


