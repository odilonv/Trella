function getDayOfWeek(date) {
    const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    return daysOfWeek[date.getDay()];
}

function formatDate(date) {
    const options = { day: '2-digit', month: '2-digit' };
    return date.toLocaleDateString('fr-FR', options).replace(/\//g, '/');
}

function formatTime(date) {
    const options = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleTimeString('fr-FR', options);
}

export { getDayOfWeek, formatDate, formatTime };
