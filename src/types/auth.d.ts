

interface RegisterUser {
    
}

interface RegisterFormState {
  errors: {
    idType?: string[];
    pid?: string[];
    title?: string[];
    surname?: string[];
    firstName?: string[];
    middleName?: string[];
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