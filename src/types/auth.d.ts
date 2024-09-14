interface RegisterUser {}

interface LoginClientForm {
  email: string;
  password: string;
}
interface RegisterClientForm {
  email: string;
  password: string;
  passwordRepeat: string;
}

interface RegisterFormState {
  errors: {
    email?: string[];
    password?: string[];
    passwordRepeat?: string[];
    _form?: string[];
  };
}

interface LoginFormState {
  errors: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
}
