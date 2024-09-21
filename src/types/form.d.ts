type FormValues =
  | LoginClientForm
  | RegisterClientForm
  | PersonalClientForm
  | UserEmploymentClientForm
  | ContactClientSetupForm
  | DeclarationClientForm
  | EmploymentClientForm
  | PastEmploymentClientForm;

interface Option {
  id: string;
  value: string;
}

interface MDAOption {
  id: string;
}
