const formatDate = (unformattedDate: Date) => {
    return new Date(unformattedDate).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
}

export default formatDate;