export const formatDate = (dateString) => {
    if (!dateString) return "";

    const [day, month, year] = dateString.split("-");
    const date = new Date(`${year}-${month}-${day}`);

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    }).format(date);
};
