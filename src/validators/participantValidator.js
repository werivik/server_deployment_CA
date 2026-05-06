const validateParticipant = (body) => {
    const { email, firstname, lastname, dob, companyname, salary, currency, country, city } = body;

    // Check that all fields are present
    if (!email || !firstname || !lastname || !dob || !companyname || !salary || !currency || !country || !city) {
        return { valid: false, message: "All fields are required: email, firstname, lastname, dob, companyname, salary, currency, country, city" };
    }

    // Validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { valid: false, message: "Invalid email format" };
    }

    // Validate the DOB format (YYYY-MM-DD)
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dobRegex.test(dob)) {
        return { valid: false, message: "Invalid date of birth format, must be YYYY-MM-DD" };
    }

    // Validate that the DOB is a real date
    const date = new Date(dob);
    if (isNaN(date.getTime())) {
        return { valid: false, message: "Invalid date of birth, must be a real date, and no - you're not from the future!" };
    }

    // Validate that the salary is a number
    if (typeof salary !== "number" || salary <= 0) {
        return { valid: false, message: "Salary must be a positive number" };
    }

    return { valid: true };
};

export default validateParticipant;