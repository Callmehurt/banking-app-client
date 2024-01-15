import * as Yup from 'yup';

export const customerRegistrationSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Please enter full name"),
    address: Yup.string().min(2).required("Please enter address"),
    email: Yup.string().email().required("Please enter email"),
    phone: Yup.string().required('Phone is required'),
  });


export const viewAccountValidationSchema = Yup.object({
    accountNumber: Yup.string().min(5).max(10).required("Please enter account number"),
  });


export const depositValidationSchema = Yup.object({
    accountNumber: Yup.string().min(5).max(10).required("Please enter account number"),
    type: Yup.string(),
    amount: Yup.number().required('Amount is required'),
  });

export const transferValidationSchema = Yup.object({
    senderAccountNumber: Yup.string().min(5).max(10).required("Please enter sender account number"),
    receiverAccountNumber: Yup.string().min(5).max(10).required("Please enter receiver account number"),
    type: Yup.string(),
    amount: Yup.number().required('Amount is required'),
  });

export const customerAmountTransferValidationSchema = Yup.object({
    receiverAccountNumber: Yup.string().min(5).max(10).required("Please enter receiver account number"),
    type: Yup.string(),
    amount: Yup.number().required('Amount is required'),
  });

export const transactionFilterValidationSchema = Yup.object({
    startDate: Yup.date().default(() => new Date()),
    endDate: Yup
          .date()
          .when(
              "startDate",
              (startDate, schema) => startDate && schema.min(startDate))
  });