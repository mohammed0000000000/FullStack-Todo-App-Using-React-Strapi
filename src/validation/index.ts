import * as yup from "yup";

export const registerSchema = yup.object({
  username: yup.string().min(3, "User name must be at least 3 characters").required("username is required"),
  email: yup.string().matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "In-Valid Email").required("email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("You Must Provide Password")
}).required();


export const loginSchema = yup.object({
  identifier: yup.string().matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "In-Valid Email").required("email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("You Must Provide Password")
}).required()




