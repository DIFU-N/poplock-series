import * as Yup from "yup";

export const loginFormSchema = Yup.object().shape({
  password: Yup.string()
    .min(4, "min 4 characters")
    .max(10, "max 10 characters")
    .required("required"),
  username: Yup.string().required("required"),
});

export const signUpFormSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("required"),
  password: Yup.string().min(8, "min 8 characters").required("required"),
  username: Yup.string().required("required"),
});

export const searchForShowSchema = Yup.object().shape({
  query: Yup.string().required("Input the name of a show"),
});
