import * as Yup from "yup";

export const userFormValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Username must be at least 4 characters")
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

  phone: Yup.string()
    .required("Phone is required")
    .min(10, "Phone must be at least 10 digits"),

  creatorAccountId: Yup.string().required("Creator Account is required"),

  subnetMask: Yup.string().required("Subnet Mask is required"),
});

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

export const addStationFormValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Name must be at least 4 characters")
    .required("Name is required"),
  address: Yup.string()
    .min(4, "Address must be at least 4 characters")
    .required("Address is required"),
  controllerPts: Yup.object().shape({
    ptsId: Yup.string()
      .min(24, "ptsId must be at least 24 characters")
      .required("ptsId is required"),
    userController: Yup.object().shape({
      username: Yup.string()
        .min(4, "Username must be at least 4 characters")
        .required("Username is required"),

      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
  }),
  countryId: Yup.number()
    .required("Country is required")
    .test("country-id-check", "Country is required", (value) => value > 0),
});
