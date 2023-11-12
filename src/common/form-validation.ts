import * as Yup from "yup";

export const userFormValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("Please enter your name"),
  lastName: Yup.string().required("Please enter your lastname"),
  username: Yup.string().required("Please enter your lastname"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});
