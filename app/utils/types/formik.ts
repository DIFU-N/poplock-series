interface AuthFormValues {
  username: string;
  password: string;
}

export type LoginFormInitialValues = AuthFormValues;

export interface SignUpFormInitialValues extends AuthFormValues {
  email: string;
  // gender: Gender,
}
