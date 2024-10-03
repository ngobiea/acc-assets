interface RegisterUser {}

interface LoginClientForm {
  email: string;
  password: string;
}
interface verifyClientForm {
  code: string;
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
  data?: {
    email: string
  }
}

interface LoginFormState {
  errors: {
    email?: string[];
    password?: string[];
    emailVerified?: string[];
    _form?: string[];
  };
  data?: {
    email: string;
  };
}
