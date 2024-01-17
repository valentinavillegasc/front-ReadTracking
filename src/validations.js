const validation = (form) => {
  const errors = {};
  if (form.fullname && !/^[A-Z][a-zA-Z ]+$/.test(form.fullname))
    errors.fullname = "Invalid name";
  if (form.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email))
    errors.email = "Invalid email format";

  if (
    form.password &&
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(form.password)
  )
    errors.password =
      "Password must contain at least 8 characters, one lowercase letter, one uppercase letter, and one digit.";

  if (form.confirmPassword && form.password !== form.confirmPassword)
    errors.confirmPassword = "Passwords do not match.";
  return errors;
};

export default validation;
