import * as Yup from "yup";

export const adduserFormValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(4, "First Name must be at least 4 characters")
    .required("First Name is required"),

  lastName: Yup.string()
    .min(4, "Last Name must be at least 4 characters")
    .required("Last Name is required"),
  phone: Yup.string().required("Phone is required"),
  username: Yup.string()
    .min(4, "Username must be at least 4 characters")
    .matches(/^[a-z]+$/, "Username must contain only lowercase letters")
    .required("Username is required"),

  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).*$/,
      "Password must contain at least one special character",
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});
