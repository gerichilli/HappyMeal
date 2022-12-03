export function validateEmpty(value) {
  if (value.trim() === "") {
    return false;
  }

  return true;
}

export function validateLength(value, length, type = "min") {
  if (type === "min") {
    if (value.length < length) {
      return false;
    }
  } else if (type === "max") {
    if (value.length > length) {
      return false;
    }
  }

  return true;
}

export function validateValidEmail(value) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(value);
}

export function validateEqual(value, password) {
  return value === password;
}

export function validateUserName(userName) {
  if (!validateEmpty(userName)) {
    return { isValid: false, message: "Username is required" };
  } else if (!validateLength(userName, 16, "max")) {
    return { isValid: false, message: "Username should be at most 16 characters" };
  } else {
    return { isValid: true, message: "" };
  }
}

export function validateEmail(email) {
  if (!validateEmpty(email)) {
    return { isValid: false, message: "Email is required" };
  } else if (!validateValidEmail(email)) {
    return { isValid: false, message: "Invalid email" };
  } else {
    return { isValid: true, message: "" };
  }
}

export function validatePassword(password) {
  if (!validateEmpty(password)) {
    return { isValid: false, message: "Password is required" };
  } else if (!validateLength(password, 8, "min")) {
    return { isValid: false, message: "Password should be at least 8 characters" };
  } else {
    return { isValid: true, message: "" };
  }
}

export function validateRePassword(rePassword, password) {
  if (!validateEmpty(rePassword)) {
    return { isValid: false, message: "Re-password is required" };
  } else if (!validateEqual(rePassword, password)) {
    return { isValid: false, message: "Re-password does not match" };
  } else {
    return { isValid: true, message: "" };
  }
}

export function validateAll(...validateFuncs) {
  let isValid = true;

  for (let i = 0; i < validateFuncs.length; i++) {
    if (!validateFuncs[i].isValid) {
      isValid = false;
      break;
    }
  }

  return isValid;
}
