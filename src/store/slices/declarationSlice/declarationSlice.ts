import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: DeclarationState = {
  activeDeclarationStep: 0,
  isFirstDeclarationStep: false,
  isLastDeclarationStep: false,
  idType: 'NIN',
  isDeletingCitizenship: false,
  isDeletingNationalCard: false,
  isDeletingPassport: false,
  isLoadingDeclaration: false,
  isStartDeclaration: false,
  isSubmittingCitizenship: false,
  isSubmittingNationalCard: false,
  isSubmittingPassport: false,
  isCashDepositFormOpen: false,
  isIDType: false,
  isNationalCardExist: false,
  isOtherCitizen: false,
  isPassportExist: false,
  isSameAsPermanent: false,
  isContactFormOpen: false,
  isCurrentEmploymentFormOpen: false,
  isFamilyFormOpen: false,
  isImmovableAssetFormOpen: false,
  isLiabilitiesFormOpen: false,
  isMovableAssetFormOpen: false,
  isOtherAssetFormOpen: false,
  isPastEmploymentFormOpen: false,
  isPersonalFormOpen: false,
  isSecurityFormOpen: false,
  isSubmittingDeclaration: false,
  isLoadingUser: true,
  user: null,
};

const declarationSlice = createSlice({
  initialState,
  name: 'declaration',
  reducers: {
    setIsLoadingDeclaration(state, action: PayloadAction<boolean>) {
      state.isLoadingDeclaration = action.payload;
    },
    toggleIsStartDeclaration(state) {
      state.isStartDeclaration = !state.isStartDeclaration;
    },
    setIsCashDepositFormOpen(state, action: PayloadAction<boolean>) {
      state.isCashDepositFormOpen = action.payload;
    },
    setIsContactFormOpen(state, action: PayloadAction<boolean>) {
      state.isContactFormOpen = action.payload;
    },
    setIsCurrentEmploymentFormOpen(state, action: PayloadAction<boolean>) {
      state.isCurrentEmploymentFormOpen = action.payload;
    },
    setIsFamilyFormOpen(state, action: PayloadAction<boolean>) {
      state.isFamilyFormOpen = action.payload;
    },
    setIsImmovableAssetFormOpen(state, action: PayloadAction<boolean>) {
      state.isImmovableAssetFormOpen = action.payload;
    },
    setIsLiabilitiesFormOpen(state, action: PayloadAction<boolean>) {
      state.isLiabilitiesFormOpen = action.payload;
    },
    setIsMovableAssetFormOpen(state, action: PayloadAction<boolean>) {
      state.isMovableAssetFormOpen = action.payload;
    },
    setIsOtherAssetFormOpen(state, action: PayloadAction<boolean>) {
      state.isOtherAssetFormOpen = action.payload;
    },
    setIsPastEmploymentFormOpen(state, action: PayloadAction<boolean>) {
      state.isPastEmploymentFormOpen = action.payload;
    },
    setIsPersonalFormOpen(state, action: PayloadAction<boolean>) {
      state.isPersonalFormOpen = action.payload;
    },
    setIsSecurityFormOpen(state, action: PayloadAction<boolean>) {
      state.isSecurityFormOpen = action.payload;
    },
    setIsSubmittingDeclaration(state, action: PayloadAction<boolean>) {
      state.isSubmittingDeclaration = action.payload;
    },
    handleNextDeclarationStep(state) {
      if (!state.isLastDeclarationStep) {
        state.activeDeclarationStep += 1;
      }
    },
    handlePrevDeclarationStep(state) {
      if (!state.isFirstDeclarationStep) {
        state.activeDeclarationStep -= 1;
      }
    },
    setActiveDeclarationStep(state, action: PayloadAction<number>) {
      state.activeDeclarationStep = action.payload;
    },
  },
});

export const {
  toggleIsStartDeclaration,
  setIsCashDepositFormOpen,
  setIsContactFormOpen,
  setIsCurrentEmploymentFormOpen,
  setIsFamilyFormOpen,
  setIsImmovableAssetFormOpen,
  setIsLiabilitiesFormOpen,
  setIsLoadingDeclaration,
  setIsMovableAssetFormOpen,
  setIsOtherAssetFormOpen,
  setIsPastEmploymentFormOpen,
  setIsPersonalFormOpen,
  setIsSecurityFormOpen,
  setIsSubmittingDeclaration,
  handleNextDeclarationStep,
  handlePrevDeclarationStep,
  setActiveDeclarationStep,
} = declarationSlice.actions;

export const declarationReducer = declarationSlice.reducer;
