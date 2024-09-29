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
  | FamilyClientForm
  | CashAtHandClientForm
  | cashDepositClientForm
  | ImmovableAssetClientForm
  | MovableAssetClientForm
  | SecurityClientForm
  | LiabilityClientForm
  | OtherAssetClientForm
  | PreviewClientForm;

interface Option {
  id: string;
  value: string;
}

interface MDAOption {
  id: string;
}
