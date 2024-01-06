import * as Yup from 'yup';

export const customerRegistrationSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Please enter full name"),
    address: Yup.string().min(2).required("Please enter address"),
    email: Yup.string().email().required("Please enter email"),
    phone: Yup.string().required('Phone is required'),
  });