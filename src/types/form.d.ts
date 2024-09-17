type FormValues =
  | LoginClientForm
  | RegisterClientForm
  | PersonalClientForm
  | UserEmploymentClientForm
  | ContactClientSetupForm
  | DeclarationClientForm
  | CurrentLastEmploymentClientForm;

interface Option {
  id: string;
  value: string;
}

interface MDAOption {
  id: string;
}
