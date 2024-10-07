export const firstNameValidation = {
  required: 'First name is required',
  pattern: {
    value: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
    message: 'First name can only contain letters with a single space between words',
  },
};
  
export const lastNameValidation = {
  required: 'Last name is required',
  pattern: {
    value: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
    message: 'Last name can only contain letters with a single space between words',
  },
};
  
export const roleValidation = {
  required: 'Role is required',
};
  
export const emailValidation = {
  required: 'Email is required',
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Invalid email format',
  },
};

export const phoneValidation = {
  required: 'Phone number is required',
  pattern: {
    value: /^\+?[0-9]\d{1,14}$/,
    message: 'Invalid phone number format',
  },
};

