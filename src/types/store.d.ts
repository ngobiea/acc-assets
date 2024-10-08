interface SetupState {
  isLastProfileStep: boolean;
  isFirstProfileStep: boolean;
  activeProfileStep: number;
  isSameAsPermanent: boolean;
  isOtherCitizen: boolean;
  isPassportExist: boolean;
  isNationalCardExist: boolean;
  isIDType: boolean;
  idType: 'NIN' | 'Passport';
  isSubmittingCitizenship: boolean;
  isDeletingCitizenship: boolean;
  isSubmittingPassport: boolean;
  isDeletingPassport: boolean;
  isSubmittingNationalCard: boolean;
  isDeletingNationalCard: boolean;
  user: UserSetupAttributes | null;
  isLoadingUser: boolean;
  isShowPersonalUpdateForm: boolean;
  isShowEmploymentUpdateForm: boolean;
  isShowContactUpdateForm: boolean;
  isShowCitizenshipUpdateForm: boolean;
  isShowPassportUpdateForm: boolean;
  isShowNationalCardUpdateForm: boolean;
}

interface AppSliceState {
  mdas: MDAAttributes[];
  file: File | null;
  openSidenav: boolean;
}
  
interface DeclarationState {
  isDeclarationFormOpen: boolean;
  isLastDeclarationStep: boolean;
  isFirstDeclarationStep: boolean;
  activeDeclarationStep: number;
  isLoadingDeclaration: boolean;
  isPersonalFormOpen: boolean;
  isEmploymentFormOpen: boolean;
  isPastEmploymentFormOpen: boolean;
  isContactFormOpen: boolean;
  isFamilyFormOpen: boolean;
  isCashDepositFormOpen: boolean;
  isCashAtHandFormOpen: boolean;
  isImmovableAssetFormOpen: boolean;
  isMovableAssetFormOpen: boolean;
  isOtherAssetFormOpen: boolean;
  isSecurityFormOpen: boolean;
  isLiabilitiesFormOpen: boolean;
  isSubmittingDeclaration: boolean;
  user: UserSetupAttributes | null;
  isLoadingUser: boolean;
  isSameAsPermanent: boolean;
  isOtherCitizen: boolean;
  isPassportExist: boolean;
  isNationalCardExist: boolean;
  isIDType: boolean;
  idType: 'NIN' | 'Passport';
  isSubmittingCitizenship: boolean;
  isDeletingCitizenship: boolean;
  isSubmittingPassport: boolean;
  isDeletingPassport: boolean;
  isSubmittingNationalCard: boolean;
  isDeletingNationalCard: boolean;
}
interface AuthSliceState {
  isSubmittingRegister: boolean;
  isSubmittingLogin: boolean;
  isSubmittingLogout: boolean;
  isSubmittingForgotPassword: boolean;
  isSubmittingResetPassword: boolean;
  isSubmittingVerification: boolean;
  isSubmittingResendVerification: boolean;
  isSubmittingUpdatePassword: boolean;
  
}