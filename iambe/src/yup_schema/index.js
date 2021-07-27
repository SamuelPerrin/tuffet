import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  username: yup.string().required('Username is required.').min(3, "Username must be at least 3 characters.").max(36, "Username cannot exceed 36 characters."),
  email: yup.string().email('Must be a valid email address.'),
  password: yup.string().required('Password is required.').min(6, "Password must be at lest 6 characters.").max(255, "Password cannot exceed 255 characters."),
});

export const loginSchema = yup.object().shape({
  username: yup.string().required('Username is required.'),
  password: yup.string().required('Password is required.'),
});