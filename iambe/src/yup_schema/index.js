import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  username: yup.string().required('Username is required.').min(3, 'Username must be at least 3 characters.').max(36, 'Username cannot exceed 36 characters.'),
  email: yup.string().email('Must be a valid email address.'),
  password: yup.string().required('Password is required.').min(6, 'Password must be at least 6 characters.').max(255, 'Password cannot exceed 255 characters.'),
});

export const loginSchema = yup.object().shape({
  username: yup.string().required('Username is required.'),
  password: yup.string().required('Password is required.'),
});

export const contactSchema = yup.object().shape({
  subject: yup.string().required('Subject is required.').max(256, 'Subject cannot be more than 256 characters.'),
  email: yup.string().email('Must be valid email address.'),
  body: yup.string().required('Message body is required.').max(4096,'Maximum message length exceeded.'),
})

export const editUserSchema = yup.object().shape({
  email: yup.string().email('Must be a valid email address.'),
  password: yup.string().min(6, 'Password must be at least 6 characters.').max(255, 'Password cannot exceed 255 characters.'),
})