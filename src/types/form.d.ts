type FormValues =
  | LoginClientForm
  | RegisterClientForm
  | PersonalClientForm
  | UserEmploymentClientForm
  | ContactClientSetupForm
  | DeclarationClientForm
  | EmploymentClientForm
  | PastEmploymentClientForm
  | ContactClientDForm
  | FamilyClientForm;

interface Option {
  id: string;
  value: string;
}

interface MDAOption {
  id: string;
}
